import * as api from '../utils/Api.js'

export async function getFamilyDetail(id) {
  
    return api.getAll('Applicant',`GetFamilyDetail?id=${id}`).then((Response) => {
        return Response
    });
  }