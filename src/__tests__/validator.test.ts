import { isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject } from '../util/validator';
import { User } from '../models/user';
import { Role } from '../models/role';

describe('validator', () => {

    test('should return true when isValidId is provided a valid id', () => {
        
        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(1);
        let result2 = isValidId(999999);
        let result3 = isValidId(Number('123'));

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);

    });

    test('should return false when isValidId is provided a invalid id (falsy)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(NaN);
        let result2 = isValidId(0);
        let result3 = isValidId(Number(null));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return false when isValidId is provided a invalid id (decimal)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(3.14);
        let result2 = isValidId(0.01);
        let result3 = isValidId(Number(4.20));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return false when isValidId is provided a invalid id (non-positive)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(0);
        let result2 = isValidId(-1);
        let result3 = isValidId(Number(-23));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return true when isValidStrings is provided valid string(s)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidStrings('valid');
        let result2 = isValidStrings('valid', 'string', 'values');
        let result3 = isValidStrings(String('weird'), String('but valid'));

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);

    });

    test('should return false when isValidStrings is provided invalid string(s)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidStrings('');
        let result2 = isValidStrings('some valid', '', 'but not all');
        let result3 = isValidStrings(String(''), String('still weird'));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return true when isValidObject is provided valid object with no nullable props', () => {

        // Arrange
        expect.assertions(1);

        // Act
        //let result1 = isValidObject(new Post(1, 'title', 'body', 1)); IMPLEMENT WITH ITEM AND ORDER
        let result2 = isValidObject(new User(1, 'username', 'password', 'first', 'last', 'email', new Role('Locked')));

        // Assert
        // expect(result1).toBe(true);
        expect(result2).toBe(true);

    });

    test('should return true when isValidObject is provided valid object with nullable prop(s)', () => {

        // Arrange
        expect.assertions(1);

        // Act
        // let result1 = isValidObject(new Post(0, 'title', 'body', 1), 'id'); IMPLEMENT WITH ITEM AND ORDER
        let result2 = isValidObject(new User(0, 'username', 'password', 'first', 'last', 'email', new Role('Locked')), 'id');

        // Assert
        // expect(result1).toBe(true);
        expect(result2).toBe(true);

    });

    test('should return false when isValidObject is provided invalid object with no nullable prop(s)', () => {

        // Arrange
        expect.assertions(1);

        // Act
        // let result1 = isValidObject(new Post(1, '', 'body', 1)); IMPLEMENT WITH ITEM AND ORDER
        let result2 = isValidObject(new User(1, 'username', 'password', '', 'last', 'email', new Role('Locked')));

        // Assert
        // expect(result1).toBe(false);
        expect(result2).toBe(false);

    });

    test('should return false when isValidObject is provided invalid object with some nullable prop(s)', () => {

        // Arrange
        expect.assertions(1);

        // Act
        // let result1 = isValidObject(new Post(1, '', 'body', 1), 'id'); IMPLEMENT WITH ITEM AND ORDER
        let result2 = isValidObject(new User(1, 'username', 'password', '', 'last', 'email', new Role('Locked')), 'id');

        // Assert
        // expect(result1).toBe(false);
        expect(result2).toBe(false);

    });

    test('should return true when isPropertyOf is provided a known property of a given constructable type', () => {

        // Arrange
        expect.assertions(2);

        // Act
        let result1 = isPropertyOf('id', User);
        let result2 = isPropertyOf('username', User);
        // let result3 = isPropertyOf('title', Post); IMPLEMENT WITH ITEM AND ORDER

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        // expect(result3).toBe(true);

    });

    test('should return false when isPropertyOf is provided a unknown property of a given constructable type', () => {

        // Arrange
        expect.assertions(2);

        // Act
        let result1 = isPropertyOf('not-real', User);
        let result2 = isPropertyOf('fake', User);
        // let result3 = isPropertyOf('titl', Post); IMPLEMENT WITH ITEM AND ORDER
 
        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        // expect(result3).toBe(false);

    });

    test('should return false when isPropertyOf is provided a non-constructable type', () => {

        // Arrange
        expect.assertions(4);

        // Act
        let result1 = isPropertyOf('shouldn\'t work', {x: 'non-constructable'});
        let result2 = isPropertyOf('nope', 2);
        let result3 = isPropertyOf('nuh-uh', false);
        let result4 = isPropertyOf('won\'t work', Symbol('asd'));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
        expect(result4).toBe(false);  

    });

    test('should return true if isEmptyObject is provided an empty object', () => {

        // Arrange
        expect.hasAssertions();

        // Act
        let result1 = isEmptyObject({});
        let result2 = isEmptyObject(new Object());

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);

    });

    test('should return true if isEmptyObject is provided an falsy value', () => {

        // Arrange
        expect.hasAssertions();

        // Act
        let result1 = isEmptyObject(false);
        let result2 = isEmptyObject(undefined);
        let result3 = isEmptyObject(null);
        let result4 = isEmptyObject(NaN);
        let result5 = isEmptyObject(0);
        let result6 = isEmptyObject('');

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
        expect(result4).toBe(true);
        expect(result5).toBe(true);
        expect(result6).toBe(true);

    });

    test('should return false if isEmptyObject is provided a non-empty object', () => {

        // Arrange
        expect.hasAssertions();

        // Act
        let result1 = isEmptyObject({x: 1});
        let result2 = isEmptyObject(new User(1, 'un', 'pw', 'fn', 'ln', 'email', new Role(4)));
        // let result3 = isEmptyObject(new Post(1, 'title', 'body', 1)); IMPLEMENT WITH ITEM AND ORDER

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        // expect(result3).toBe(false); 

    });

});