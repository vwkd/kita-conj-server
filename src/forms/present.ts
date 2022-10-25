import { select_version, error } from "./utils.ts";

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

export default function getForm({ version, root, thema }, person_s_selected) {
  
  const version_vocal = select_version({ version });
  
  const { person1, person2 } = select_pz_s({ root, thema }, person_s_selected);
  
  return {
    preverb: null,
    person1,
    version: version_vocal,
    root,
    thema,
    person2,
  };
}
