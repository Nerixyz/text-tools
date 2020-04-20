import { PipelineData, PipelineItem, PipelineItemDirection, PipelineItemType } from '@/pipeline/types';
import hex from '@/pipeline/hex';
import base64 from '@/pipeline/base64';
import { expectString } from '@/pipeline/utilities';
import flate from '@/pipeline/flate';
import gzip from '@/pipeline/gzip';

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
};

self.onmessage = async ({ data }: { data: WorkerData }) => {
  if (typeof data.message !== 'string') return;
  let lastPipe = 'none';
  try {
    const pipeline: PipelineItem[] = data.pipeline;

    let currentValue: PipelineData = data.message;
    for (const item of pipeline) {
      lastPipe = `${item.type} > ${item.direction === PipelineItemDirection.Encode ? 'encode' : 'decode'}`;
      currentValue = await Pipes[item.type](currentValue, item.direction, item.options);
    }

    self.postMessage({ message: expectString(currentValue) });
  } catch (e) {
    self.postMessage({ ...(typeof e === 'object' ? e : { str: e }), error: e, lastPipe });
  }
};
