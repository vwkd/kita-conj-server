import { definitions } from "./deps.ts";
import getPlaceholder from "./forms/placeholder.ts";
import getPRS from "./forms/prs.ts";
import getIMPF from "./forms/impf.ts";
import getPRSSUBJ from "./forms/prssubj.ts";
import getFUT from "./forms/fut.ts";
import getCOND from "./forms/cond.ts";
import getFUTSUBJ from "./forms/futsubj.ts";
import getAOR from "./forms/aor.ts";
import getAORIMPF from "./forms/aorimpf.ts";
import getOPT from "./forms/opt.ts";
import getOPTIMPF from "./forms/optimpf.ts";

export const entries = definitions.map(d => generate(d));

function generate({ id, exceptions = {}, ...args }) {

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
  const { SRS1: excSRS1, SRS2: excSRS2, SRS3: excSRS3, ...excAll } = exceptions;
  
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
  const { PRS: excPRS, IMPF: excIMPF, PRSSUBJ: excPRSSUBJ, ...excAll } = exceptions;
  
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
  const { FUT: excFUT, COND: excCOND, FUTSUBJ: excFUTSUBJ, ...excAll } = exceptions;
  
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
  const { GRP1: excGRP1, GRP2: excGRP2, ...excAll } = exceptions;
  
  const GRP1 = getGRP1(args, { ...excAll, ...excGRP1 });
  
  const GRP2 = getGRP2(args, { ...excAll, ...excGRP2 });
  
  return {
    GRP1,
    GRP2,
  };
}

function getSRS2(args, exceptions) {
  const { AOR: excAOR, AORIMPF: excAORIMPF, OPT: excOPT, OPTIMPF: excOPTIMPF, ...excAll } = exceptions;
  
  const AOR = getScreeve(args, { ...excAll, ...excAOR }, getAOR);
  
  const AORIMPF = getScreeve(args, { ...excAll, ...excAORIMPF }, getAORIMPF);
  
  const OPT = getScreeve(args, { ...excAll, ...excOPT }, getOPT);
  
  const OPTIMPF = getScreeve(args, { ...excAll, ...excOPTIMPF }, getOPTIMPF);
  
  return {
    AOR,
    AORIMPF,
    OPT,
    OPTIMPF,
  };
}

function getSRS3(args, exceptions) {
  const { PERF: excPERF, PERFIMPF: excPERFIMPF, PLUPERF: excPLUPERF, PLUPERFIMPF: excPLUPERFIMPF, PERFSUBJ: excPERFSUBJ, PERFSUBJIMPF: excPERFSUBJIMPF, ...excAll } = exceptions;
  
  const PLACEHOLDER = getScreeve(args, {}, getPlaceholder);
  // todo: placeholder, fill with actual screeves
  const PERF = PLACEHOLDER;
  const PERFIMPF = PLACEHOLDER;
  const PLUPERF = PLACEHOLDER;
  const PLUPERFIMPF = PLACEHOLDER;
  const PERFSUBJ = PLACEHOLDER;
  const PERFSUBJIMPF = PLACEHOLDER;
  
  return {
    PERF,
    PERFIMPF,
    PLUPERF,
    PLUPERFIMPF,
    PERFSUBJ,
    PERFSUBJIMPF,
  };
}

function getScreeve(args, exceptions, getForm) {
  const { S1: excS1, S2: excS2, S3: excS3, P1: excP1, P2: excP2, P3: excP3, ...excAll } = exceptions;
  
  const S1 = getForm(args, { ...excAll, ...excS1 }, "S1");
  
  const S2 = getForm(args, { ...excAll, ...excS2 }, "S2");
  
  const S3 = getForm(args, { ...excAll, ...excS3 }, "S3");
  
  const P1 = getForm(args, { ...excAll, ...excP1 }, "P1");
  
  const P2 = getForm(args, { ...excAll, ...excP2 }, "P2");
  
  const P3 = getForm(args, { ...excAll, ...excP3 }, "P3");
  
  return {
    S1,
    S2,
    S3,
    P1,
    P2,
    P3,
  };
}
