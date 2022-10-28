import { definitions } from "./deps.ts";
import getPRS from "./forms/prs.ts";
import getIMPF from "./forms/impf.ts";
import getPRSSUBJ from "./forms/prssubj.ts";
import getFUT from "./forms/fut.ts";
import getCOND from "./forms/cond.ts";
import getFUTSUBJ from "./forms/futsubj.ts";

export const entries = definitions.map(d => generate(d));

function generate({ id, exceptions, ...args }) {
  
  const value = getTable(args, exceptions);
  
  return {
    id,
    value,
  };
}

function getTable(args, { person1, version, root, thema, person2, ...children }) {
  const exceptionsSRS1 = { person1, version, root, thema, person2, ...children?.SRS1 };
  const SRS1 = getSRS1(args, exceptionsSRS1);
  
  const exceptionsSRS2 = { person1, version, root, thema, person2, ...children?.SRS2 };
  const SRS2 = getSRS2(args, exceptionsSRS2);
  
  const exceptionsSRS3 = { person1, version, root, thema, person2, ...children?.SRS3 };
  const SRS3 = getSRS3(args, exceptionsSRS3);
  
  const exceptionsINF = { person1, version, root, thema, person2, ...children?.INF };
  const INF = getINF(args, exceptionsINF);
  
  const exceptionsIMP = { person1, version, root, thema, person2, ...children?.IMP };
  const IMP = getIMP(args, exceptionsIMP);
  
  return {
    SRS1,
    SRS2,
    SRS3,
    IMP,
    INF,
  };
}

function getGRP1(args, { person1, version, root, thema, person2, ...children }) {
  const exceptionsPRS = { person1, version, root, thema, person2, ...children?.PRS };
  const PRS = getScreeve(args, exceptionsPRS, getPRS);
  
  const exceptionsIMPF = { person1, version, root, thema, person2, ...children?.IMPF };
  const IMPF = getScreeve(args, exceptionsIMPF, getIMPF);
  
  const exceptionsPRSSUBJ = { person1, version, root, thema, person2, ...children?.PRSSUBJ };
  const PRSSUBJ = getScreeve(args, exceptionsPRSSUBJ, getPRSSUBJ);
  
  return {
    PRS,
    IMPF,
    PRSSUBJ,
  };
}

function getGRP2(args, { person1, version, root, thema, person2, ...children }) {
  const exceptionsFUT = { person1, version, root, thema, person2, ...children?.FUT };
  const FUT = getScreeve(args, exceptionsFUT, getFUT);
  
  const exceptionsCOND = { person1, version, root, thema, person2, ...children?.COND };
  const COND = getScreeve(args, exceptionsCOND, getCOND);
  
  const exceptionsFUTSUBJ = { person1, version, root, thema, person2, ...children?.FUTSUBJ };
  const FUTSUBJ = getScreeve(args, exceptionsFUTSUBJ, getFUTSUBJ);

  return {
    FUT,
    COND,
    FUTSUBJ,
  };
}

function getSRS1(args, { person1, version, root, thema, person2, ...children }) {
  const exceptionsGRP1 = { person1, version, root, thema, person2, ...children?.GRP1 };
  const GRP1 = getGRP1(args, exceptionsGRP1);
  
  const exceptionsGRP2 = { person1, version, root, thema, person2, ...children?.GRP2 };
  const GRP2 = getGRP2(args, exceptionsGRP2);
  
  return {
    GRP1,
    GRP2,
  };
}

function getSRS2(args, { person1, version, root, thema, person2, ...children }) {
  const PRS = getScreeve(args, {}, getPRS);
  // todo: placeholder, fill with actual screeves
  const AOR = PRS;
  const AORIMPF = PRS;
  const OPT = PRS;
  const OPTIMPF = PRS;
  
  return {
    AOR,
    AORIMPF,
    OPT,
    OPTIMPF,
  };
}

function getSRS3(args, { person1, version, root, thema, person2, ...children }) {
  const PRS = getScreeve(args, {}, getPRS);
  // todo: placeholder, fill with actual screeves
  const PERF = PRS;
  const PERFIMPF = PRS;
  const PLUPERF = PRS;
  const PLUPERFIMPF = PRS;
  const PERFSUBJ = PRS;
  const PERFSUBJIMPF = PRS;
  
  return {
    PERF,
    PERFIMPF,
    PLUPERF,
    PLUPERFIMPF,
    PERFSUBJ,
    PERFSUBJIMPF,
  };
}

function getIMP(args, { person1, version, root, thema, person2, ...children }) {
  const PRS = getScreeve(args, {}, getPRS);
  // todo: placeholder, fill with actual screeves
  const IMPAFF = PRS;
  const IMPAFFIMPF = PRS;
  const IMPPRB1 = PRS;
  const IMPPRB1IMPF = PRS;
  const IMPPRB2 = PRS;
  
  return {
    IMPAFF,
    IMPAFFIMPF,
    IMPPRB1,
    IMPPRB1IMPF,
    IMPPRB2,
  };
}

function getINF(args, { person1, version, root, thema, person2, ...children }) {
  const PRS = getScreeve(args, {}, getPRS);
  // todo: placeholder, fill with actual screeves
  const INF = PRS;
  const INFIMPF = PRS;
  
  return {
    INF,
    INFIMPF,
  };
}

function getScreeve(args, { person1, version, root, thema, person2, ...children }, getForm) {
  const exceptionsS1 = { person1, version, root, thema, person2, ...children?.S1 };
  const S1 = getForm(args, exceptionsS1, "S1");
  
  const exceptionsS2 = { person1, version, root, thema, person2, ...children?.S2 };
  const S2 = getForm(args, exceptionsS2, "S2");
  
  const exceptionsS3 = { person1, version, root, thema, person2, ...children?.S3 };
  const S3 = getForm(args, exceptionsS3, "S3");
  
  const exceptionsP1 = { person1, version, root, thema, person2, ...children?.P1 };
  const P1 = getForm(args, exceptionsP1, "P1");
  
  const exceptionsP2 = { person1, version, root, thema, person2, ...children?.P2 };
  const P2 = getForm(args, exceptionsP2, "P2");
  
  const exceptionsP3 = { person1, version, root, thema, person2, ...children?.P3 };
  const P3 = getForm(args, exceptionsP3, "P3");
  
  return {
    S1,
    S2,
    S3,
    P1,
    P2,
    P3,
  };
}
