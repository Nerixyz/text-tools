import { Buffer } from 'buffer';
import { PipelineData, PipelineItemDirection } from '@/pipeline/types';
import { expectBuffer, expectString } from '@/pipeline/utilities';

export default function(input: PipelineData, direction: PipelineItemDirection, options: {} = {}) {
  if(direction === PipelineItemDirection.Encode) {
    return expectBuffer(input).toString('base64');
  } else {
    return Buffer.from(expectString(input), 'base64');
  }
}
