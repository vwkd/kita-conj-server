function ConsoleLogger() {
  return {
    debug(...args) { console.debug("DEBUG", ...args) },
    info(...args) { console.info("INFO", ...args) },
    warn(...args) { console.warn("WARN", ...args) },
    error(...args) { console.error("ERROR", ...args) },
  };
}

export const log = ConsoleLogger();
