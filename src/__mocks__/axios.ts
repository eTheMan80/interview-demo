/* eslint-disable import/no-anonymous-default-export */

import { vitest } from "vitest";
import data from '@/services/data/data.json'

export default {
  get: vitest.fn().mockResolvedValue({
    data: data,
  }),
}