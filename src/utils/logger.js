import chalk from 'chalk';

const isNode = typeof process === 'object' && `${process}` === '[object process]';

class Logger {
  log = (color, label, message) => {
    if (process.env.LOG) {
      if (typeof message === 'object') {
        // eslint-disable-next-line no-param-reassign
        message = JSON.stringify(message, null, 2);
      }

      if (isNode) {
        // eslint-disable-next-line no-console
        console.log(`[${chalk[color](label)}] ${message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `%c ${label} %c ${message}`,
          `background-color: ${color}; color: #FFFFFF`,
          `background-color: inherit; color: inherit`
        );
      }
    }
  };

  info = (label, message) => {
    return this.log('blue', label, message);
  };

  success = (label, message) => {
    return this.log('green', label, message);
  };

  warn = (label, message) => {
    return this.log('yellow', label, message);
  };

  error = (label, message) => {
    return this.log('red', label, message);
  };
}

export default new Logger();
