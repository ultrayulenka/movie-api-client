import identity from 'lodash/identity';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';
import pickBy from 'lodash/pickBy';

const removeFalsyValues = <T>(
  object: Record<string, T | undefined | null>
): Record<string, Exclude<T, undefined | null>> =>
  pickBy(object, identity) as Record<string, Exclude<T, undefined | null>>;

const removeUndefinedValues = <T>(
  object: Record<string, T | undefined>
): Record<string, Exclude<T, undefined>> =>
  omitBy(object, isUndefined) as Record<string, Exclude<T, undefined>>;

const removeEmptyValues = <T>(
  object: Record<string, T | undefined>
): Record<string, Exclude<T, undefined>> =>
  omitBy(
    object,
    (value) => value === undefined || (value as unknown) === 0
  ) as Record<string, Exclude<T, undefined>>;

export { removeFalsyValues, removeUndefinedValues, removeEmptyValues };
