import { User } from '../models';

/**
 * User service Class
 */
export default class UserServices {
  /**
   * @name CreateUser
   * @description Interacts with model to create a new user
   * @param { string } userData the user's data
   * @returns {object} return the updated field
   */
  static async createUser(userData) {
    const { dataValues } = await User.create(userData);
    delete dataValues.password; // remove sensitive data from returned object
    return dataValues;
  }

  /**
   * @name GetUserByEmail
   * @description Interacts with model to find a single user
   * @param { string } email the user's email
   * @returns {object} return the user's data
   */
  static async getUserByEmail(email) {
    const data = await User.findOne({ where: { email } });
    return data;
  }

  /**
   * @name updateUserById
   * @description Interacts with model to find a single user
   * @param { object } attribute the user attribute to update
   * @param { string } id the user's id
   * @returns {object} return the user's data
   */
  static async updateUserById(attribute, id) {
    const { name, value } = attribute;
    const userDetails = await User.update(
      { [name]: value },
      { where: { id } },
      { returning: true },
    );
    return userDetails;
  }

  /**
   * @name updatePasswordByEmail
   * @description Interacts with model to find a update user password
   * @param { object } email the user email
   * @param { string } password the user's password
   * @returns {object} return the user's data
   */
  static async updatePasswordByEmail(email, password) {
    await User.update({ password }, { where: { email } }, { returning: true });
    const data = await User.findOne({ where: { email } });
    delete data.dataValues.password;
    return data.dataValues;
  }

  /**
   * @name updateUserInfoById
   * @description Interacts with model to find a single user
   * @param { object } attribute the user attribute to update
   * @param { string } email the user's email
   * @returns {object} return the user's data
   */
  static async updateUserInfoById(attribute, email) {
    const {
      firstName,
      middleName,
      lastName,
      birthDate,
      Address,
      gender,
      phoneNumber,
      memberType,
    } = attribute;
    const userDetails = await User.update(
      {
        firstName,
        middleName,
        lastName,
        birthDate,
        gender,
        Address,
        phoneNumber,
        memberType,
      },
      { where: { email }, returning: true, plain: true },
    );
    const result = userDetails[1].dataValues;
    delete result.password;
    return result;
  }
}
