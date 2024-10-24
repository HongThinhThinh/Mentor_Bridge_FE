import _ from 'lodash';

function flattenObject(
    obj: Record<string, any>,  // Generic object type
    parentKey: string = '', 
    result: Record<string, any> = {}  // Result will be a flat object
): Record<string, any> {
    _.forOwn(obj, (value, key) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (_.isObject(value) && !_.isArray(value)) {
            flattenObject(value, newKey, result); // Recurse if it's a nested object
        } else {
            result[newKey] = value; // Assign value if it's not an object
        }
    });
    return result;
}