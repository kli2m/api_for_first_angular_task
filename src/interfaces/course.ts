interface CourseType {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: [string];
  _id?: string;
  id?: string;
}

export default CourseType;
