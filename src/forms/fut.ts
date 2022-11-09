import { Form, merge_person1, merge_person2 } from "./utils.ts";
import { select_person1_s, select_person2_s, select_person1_o, select_person2_o } from "./prs.ts";

export default function getFUT(args, exceptions, person_s, person_o) {
  const obj = args.obj;
  const form = Form(person_s, person_o, obj);
  
  form.preverb = args.preverb;
  form.version = args.version;
  form.root = args.root;
  form.thema = args.thema;
  form.modus = null;
  
  form.preverbExc = exceptions.preverb;
  form.versionExc = exceptions.version;
  form.rootExc = exceptions.root;
  form.themaExc = exceptions.thema;
  form.modusExc = exceptions.modus;
  
  const stem = form.stemValue;
  const pre_s = select_person1_s(person_s);
  const pre_o = select_person1_o(person_o, { obj, stem });
  const post_s = select_person2_s(person_s, { stem });
  const post_o = select_person2_o(person_o, { obj });
  form.person1 = merge_person1(pre_s, pre_o, person_s, person_o, obj);
  form.person2 = merge_person2(post_s, post_o, person_s, person_o, obj);
  
  form.person1Exc = exceptions.person1;
  form.person2Exc = exceptions.person2;
  
  return form;
}
