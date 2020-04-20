import { PipelineData, PipelineItemDirection } from '@/pipeline/types';
import { expectBuffer } from '@/pipeline/utilities';
import { gzip, ungzip } from 'pako';

export default function(input: PipelineData, direction: PipelineItemDirection, options: {} = {}): PipelineData {
  if (direction === PipelineItemDirection.Encode) {
    return expectBuffer(gzip(expectBuffer(input), options));
  } else {
    return expectBuffer(ungzip(expectBuffer(input), options));
  }
}
