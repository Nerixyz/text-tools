import { PipelineData, PipelineItemDirection } from '@/pipeline/types';
import { expectString } from '@/pipeline/utilities';

export default function(input: PipelineData, direction: PipelineItemDirection, options: {} = {}) {
  if (direction === PipelineItemDirection.Encode) {
    return encodeURIComponent(expectString(input));
  } else {
    return decodeURIComponent(expectString(input));
  }
}
