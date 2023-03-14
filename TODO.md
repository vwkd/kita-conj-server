# TODO



- consider using same single component for modus (only used in IMPF, PRSSUBJ, COND, FUTSUBJ), perfect2 (only used in PERF, PLUPERF, PERFSUBJ), rename because Modus is wrong name

- validate exceptions
- add other categories



## PZ merging

figure out if there are screeves in which

### merge_person1

- pz_s S3 is not null
then add back "pz_o P2 appended after pz_s S3"
- pz_io X3 and pz_s X are not null (except pz_o S3 and pz_s X1)
then add back "pz_o X3 appended after pz_s X"

### merge_person2

- pz_io X3 is not null
then add back "(ONLY IO) pz_o X3 appended after pz_s X"
/// partly reverted
- pz_s S3 and/or pz_o P2 is null
then fix rule "pz_o P2 appended after pz_s S3"

// TODO Post R??1: maybe also for pz_o P3 and pz_s X3 (PERF, maybe INDIRECT VERBS)
