import { pino } from "pino";
import dayjs from "dayjs";
import PinoPretty from "pino-pretty";

const stream = PinoPretty({
  colorize: true,
});

const log = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss")}"`,
  },
  stream
);

export default log;
