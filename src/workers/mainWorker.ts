import { PipelineData, PipelineItem, PipelineItemDirection, PipelineItemType } from '@/pipeline/types';
import hex from '@/pipeline/hex';
import base64 from '@/pipeline/base64';
import { expectString } from '@/pipeline/utilities';
import flate from '@/pipeline/flate';
import gzip from '@/pipeline/gzip';
import url from '@/pipeline/url';

declare const self: Worker;

type WorkerData = {
  message: string;
  pipeline: PipelineItem[];
};
type PipelineFn = (
  data: PipelineData,
  direction: PipelineItemDirection,
  options: any,
) => PipelineData | Promise<PipelineData>;

const Pipes: { [x in PipelineItemType]: PipelineFn } = {
  hex,
  base64,
  flate,
  gzip,
  url
};
console.log(this);

self.onmessage = async ({ data }: { data: WorkerData }) => {
  console.log('onMessage', data);
  if(typeof data !== 'string') return;
  const input = JSON.parse(data);
  console.log(input)
  if (typeof input.message !== 'string') return;
  console.log(input.message);
  const post = (data: any) => self.postMessage(JSON.stringify(data));

  let lastPipe = 'none';
  try {
    const pipeline: PipelineItem[] = input.pipeline;

    let currentValue: PipelineData = input.message;
    for (const item of pipeline) {
      lastPipe = `${item.type} > ${item.direction === PipelineItemDirection.Encode ? 'encode' : 'decode'}`;
      console.log(lastPipe);
      currentValue = await Pipes[item.type](currentValue, item.direction, item.options);
    }
    console.log('onMessage', 'done - post');

    post({ message: expectString(currentValue) });
  } catch (e) {
    post({ ...(typeof e === 'object' ? e : { str: e }), error: e, lastPipe });
  }
};
