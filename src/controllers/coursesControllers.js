import CourseServices from '../services/courseServices';
import ResponseMsg from '../utils/response';

const { resLong, resErr } = ResponseMsg;

/**
 * @class CourseController
 * @description Contains methods for each user related endpoint
 * @exports CourseController
 */
class CourseController {
  /**
    * @method CreateCourse
    * @description Adds a course to the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static async CreateCourse(req, res) {
    try {
      const newCourse = await CourseServices.createCourse(req.body);
      return resLong(res, 201, newCourse);
    } catch (error) {
      return resErr(res, 500, error.message);
    }
  }

  /**
    * @method GetCourses
    * @description Fetches all courses from the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static async GetCourses(req, res) {
    try {
      const result = await CourseServices.getAllCourse();
      return resLong(res, 200, result);
    } catch (error) {
      return resErr(res, 400, error.message);
    }
  }

  /**
    * @method takeCourse
    * @description Adds a users course details to the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static async takeCourse(req, res) {
    const courseId = req.params.id;
    const userId = req.user.id;
    try {
      console.log(userId, courseId);
      const userCourse = await CourseServices.getAUserCourseBy(courseId);
      
      if (userCourse) {
        return resErr(res, 400, 'You can\'t register for the same course twice');
      }
      const newUserCourse = await CourseServices.takeCourse({ userId, courseId, registeredOn: new Date() });
      console.log(newUserCourse);
      // const course = await CourseServices.getCourseById(newCourse.userId, newCourse.courseId);
      return resLong(res, 201, { ...newUserCourse });
    } catch (error) {
      console.log(error);
      return resErr(res, 500, error.message);
    }
  }

  /**
    * @method getUserCourses
    * @description Fetches all courses from the database
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static async getUserCourses(req, res) {
    try {
      const { userId } = req.params;
      const result = await CourseServices.getCourseByUserId(userId);
      return resLong(res, 200, result);
    } catch (error) {
      return resErr(res, 400, error.message);
    }
  }
}
export default CourseController;
