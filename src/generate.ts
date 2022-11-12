import { definitions, log } from "./deps.ts";
import getPRS from "./forms/prs.ts";
import getIMPF from "./forms/impf.ts";
import getPRSSUBJ from "./forms/prssubj.ts";
import getFUT from "./forms/fut.ts";
import getCOND from "./forms/cond.ts";
import getFUTSUBJ from "./forms/futsubj.ts";
import getAOR from "./forms/aor.ts";
import getOPT from "./forms/opt.ts";
import getPERF from "./forms/perf.ts";
import getPLUPERF from "./forms/pluperf.ts";
import getPERFSUBJ from "./forms/perfsubj.ts";
import { validateArgs } from "./forms/utils.ts";

export const entries = definitions.map(d => generate(d));

function generate({ id, exceptions = {}, ...args }) {
  log.info("Generating", id, args, exceptions);
  
  validateArgs(args);

  const definition = {
    ...args
  };
  
  const value = getTable(args, exceptions);
  
  return {
    id,
    definition,
    value,
  };
}

function getTable(args, exceptions) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { SRS1: excSRS1, SRS2: excSRS2, SRS3: excSRS3, ...excAll } = excRest;
  
  const SRS1 = getSRS1(args, { ...excAll, ...excSRS1 });
  
  const SRS2 = getSRS2(args, { ...excAll, ...excSRS2 });
  
  const SRS3 = getSRS3(args, { ...excAll, ...excSRS3 });
  
  return {
    SRS1,
    SRS2,
    SRS3,
  };
}

function getGRP1(args, exceptions) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { PRS: excPRS, IMPF: excIMPF, PRSSUBJ: excPRSSUBJ, ...excAll } = excRest;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const PRS = getScreeve(args, { ...excAll, ...excPRS }, getPRS);
  
  const IMPF = getScreeve(args, { ...excAll, ...excIMPF }, getIMPF);
  
  const PRSSUBJ = getScreeve(args, { ...excAll, ...excPRSSUBJ }, getPRSSUBJ);
  
  return {
    PRS,
    IMPF,
    PRSSUBJ,
  };
}

function getGRP2(args, exceptions) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { FUT: excFUT, COND: excCOND, FUTSUBJ: excFUTSUBJ, ...excAll } = excRest;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const FUT = getScreeve(args, { ...excAll, ...excFUT }, getFUT);
  
  const COND = getScreeve(args, { ...excAll, ...excCOND }, getCOND);
  
  const FUTSUBJ = getScreeve(args, { ...excAll, ...excFUTSUBJ }, getFUTSUBJ);

  return {
    FUT,
    COND,
    FUTSUBJ,
  };
}

function getSRS1(args, exceptions) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { GRP1: excGRP1, GRP2: excGRP2, ...excAll } = excRest;
  
  const GRP1 = getGRP1(args, { ...excAll, ...excGRP1 });
  
  const GRP2 = getGRP2(args, { ...excAll, ...excGRP2 });
  
  return {
    GRP1,
    GRP2,
  };
}

function getSRS2(args, exceptions) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { AOR: excAOR, OPT: excOPT, ...excAll } = excRest;
  
  const AOR = getScreeve(args, { ...excAll, ...excAOR }, getAOR);
  
  const OPT = getScreeve(args, { ...excAll, ...excOPT }, getOPT);
  
  return {
    AOR,
    OPT,
  };
}

function getSRS3(args, exceptions) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { PERF: excPERF, PLUPERF: excPLUPERF, PERFSUBJ: excPERFSUBJ, ...excAll } = excRest;
  
  const PERF = getScreeve(args, { ...excAll, ...excPERF }, getPERF);
  
  const PLUPERF = getScreeve(args, { ...excAll, ...excPLUPERF }, getPLUPERF);
  
  const PERFSUBJ = getScreeve(args, { ...excAll, ...excPERFSUBJ }, getPERFSUBJ);
  
  return {
    PERF,
    PLUPERF,
    PERFSUBJ,
  };
}

function getScreeve(args, exceptions, form) {
  log.info("getScreeve", form.name);
  
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { S1: excS1, S2: excS2, S3: excS3, P1: excP1, P2: excP2, P3: excP3, ...excAll } = excRest;
  
  const S1 = getSubject(args, { ...excAll, ...excS1 }, form, "S1");
  
  const S2 = getSubject(args, { ...excAll, ...excS2 }, form, "S2");
  
  const S3 = getSubject(args, { ...excAll, ...excS3 }, form, "S3");
  
  const P1 = getSubject(args, { ...excAll, ...excP1 }, form, "P1");
  
  const P2 = getSubject(args, { ...excAll, ...excP2 }, form, "P2");
  
  const P3 = getSubject(args, { ...excAll, ...excP3 }, form, "P3");
  
  return {
    S1,
    S2,
    S3,
    P1,
    P2,
    P3,
  };
}

function getSubject(args, exceptions, form, person_o) {
  const { value, note, ...excRest } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  const { S1: excS1, S2: excS2, S3: excS3, P1: excP1, P2: excP2, P3: excP3, ...excAll } = excRest;
  
  const S1 = getForm(args, { ...excAll, ...excS1 }, form, "S1", person_o);
  
  const S2 = getForm(args, { ...excAll, ...excS2 }, form, "S2", person_o);
  
  const S3 = getForm(args, { ...excAll, ...excS3 }, form, "S3", person_o);
  
  const P1 = getForm(args, { ...excAll, ...excP1 }, form, "P1", person_o);
  
  const P2 = getForm(args, { ...excAll, ...excP2 }, form, "P2", person_o);
  
  const P3 = getForm(args, { ...excAll, ...excP3 }, form, "P3", person_o);
  
  return {
    S1,
    S2,
    S3,
    P1,
    P2,
    P3,
  };
}

function getForm(args, exceptions, form, person_s, person_o) {
  log.info("getForm", person_s, person_o);
  const { value, note } = exceptions;
  
  if (note) {
    return {
      value,
      note,
    };
  }
  
  if ((person_o.slice(-1) == "1" || person_o.slice(-1) == "2") && person_o.slice(-1) == person_s.slice(-1)) {
    return {
      value: null,
      note: `Reflexivity doesn't exist. Instead use X3 with 'თავი'`,
    };
  }
  
  const { preverb, person1, version, root, thema, modus, perfect2, person2 } = form(args, person_s, person_o);
  
  return {
    preverb,
    person1,
    version,
    root,
    thema,
    modus,
    perfect2,
    person2,
  }
}
