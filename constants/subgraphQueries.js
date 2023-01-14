import { gql, useQuery } from '@apollo/client'

const GET_STUDENTS = gql` 
 query GetStudents {
      studentAddeds(first:5) {
        id
        sId
        name
        email
        imgHash
      }
  }
`;
export default GET_STUDENTS