import { GrAddCircle, GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styled from 'styled-components'

export const AddIcon = styled(GrAddCircle)`
    padding-bottom: 15px;
    padding-left: 25px;
    cursor: pointer;
`
export const EditIcon = styled(GrEdit)`
    padding-bottom: 15px;
    padding-left: 25px;
    cursor: pointer;
    vertical-align: middle;
`
export const DeleteIcon = styled(RiDeleteBin6Line)`
    padding-bottom: 10px;
    padding-left: 25px;
    cursor: pointer;
    vertical-align: middle;
`