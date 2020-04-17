import { FrontPipelineItemDescriptors, PipelineData, PipelineItemDirection } from '@/pipeline/types';
import { expectBuffer } from '@/pipeline/utilities';
import { deflate, inflate } from 'pako';

export default function(input: PipelineData, direction: PipelineItemDirection, options: {} = {}): PipelineData {
  if (direction === PipelineItemDirection.Encode) {
    return expectBuffer(deflate(expectBuffer(input), options));
  } else {
    return expectBuffer(inflate(expectBuffer(input), options));
  }
}

export const DeflateOptionDescriptors: FrontPipelineItemDescriptors = {
  level: {
    display: 'Level',
    type: 'number',
    steps: true,
    range: [-1, 9],
  },
  raw: { type: 'boolean', display: 'Raw' },
};

export const InflateOptionDescriptors: FrontPipelineItemDescriptors = {
  raw: { type: 'boolean', display: 'Raw' },
};
