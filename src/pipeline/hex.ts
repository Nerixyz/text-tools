import { PipelineData, PipelineItemDirection } from '@/pipeline/types';
import { expectBuffer, expectString } from '@/pipeline/utilities';
import { Buffer } from 'buffer';

export default function(
  input: PipelineData,
  direction: PipelineItemDirection,
  options: {
    ignoreInvalid?: boolean;
  } = {},
) {
  if (direction === PipelineItemDirection.Encode) {
    return expectBuffer(input).toString('hex');
  } else {
    let str = expectString(input);
    if (options.ignoreInvalid) {
      str = str.replace(/[^0-9A-Fa-f]/g, '');
    }
    return Buffer.from(str, 'hex');
  }
}
