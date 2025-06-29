/**
 * Defines a type for an object where keys are strings and values can be of any type.
 */
export type StringKeyToObject = Record<string, unknown>;
/**
 * Defines a type for an object where keys are strings and values are strings.
 */
export type StringKeyToString = Record<string, string>;
/**
 * Defines a type for a function that accepts a value and performs an action.
 * @param value The value to be processed.
 */
export type ConsumerFunction<T> = (value: T) => void;
/**
 * Defines a type for a function that returns a value.
 */
export type SupplierFunction<T> = () => T;
/**
 * Defines a type for a function that transforms a value from one type to another.
 * @param value The value to be transformed.
 */
export type MapperFunction<I, O> = (value: I) => O;
/**
 * Defines a type for a function that evaluates a value and returns a boolean.
 * @param value The value to be evaluated.
 */
export type PredicateFunction<T> = (value: T) => boolean;

/**
 * Represents an object that provides a mapping function.
 * @property map A function that transforms one value to another.
 */
export interface IMapperObject<I, O> {
    map: MapperFunction<I, O>;
}
