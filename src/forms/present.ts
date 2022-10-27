import { error, Form, validateArgs, validateExceptions } from "./utils.ts";

function select_pz_s({ root, thema }, person_s_selected) {
  const stem = thema ? root + thema : root;
  
  return person_s_selected == "S1"
    ? {
      person1: "ვ",
      person2: null,
    }
    : person_s_selected == "S2"
    ? {
        person1: null,
        person2: null,
      }
    : person_s_selected == "S3"
    ? {
        person1: null,
        person2: "ს",
      }
    : person_s_selected == "P1"
    ? {
        person1: "ვ",
        person2: "თ",
      }
    : person_s_selected == "P2"
    ? {
        person1: null,
        person2: "თ",
      }
    : person_s_selected == "P3"
    ? {
        person1: null,
        person2: stem.endsWith("ი") ? "ან" : "ენ",
      }
    : error(`Invalid person_s_selected "${person_s_selected}"`);
}

export default function getForm(args, exceptions, person_s_selected) {
  validateArgs(args);
  validateExceptions(exceptions);
  
  const preverb = exceptions?.preverb?.value !== undefined ? exceptions.preverb.value : null;
  const version = exceptions?.version?.value !== undefined ? exceptions.version.value : args.version;
  const root = exceptions?.root?.value !== undefined ? exceptions.root.value : args.root;
  const thema = exceptions?.thema?.value !== undefined ? exceptions.thema.value : args.thema;
  
  const { person1, person2 } = select_pz_s({ root, thema }, person_s_selected);
  
  const form = Form({ person1, version, root, thema, person2 });
  
  if (exceptions?.preverb) {
    form.preverb = exceptions.preverb;
  }
  
  if (exceptions?.version) {
    form.version = exceptions.version;
  }
  
  if (exceptions?.root) {
    form.root = exceptions.root;
  }
  
  if (exceptions?.thema) {
    form.thema = exceptions.thema;
  }
  
  return form;
}
