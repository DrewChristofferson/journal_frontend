import * as bs from 'react-bootstrap'
import Button from '../../Components/Button/Button';
import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AppContext from '../../context/context';
import { DeleteIcon } from '../../Components/Icons/Icons'


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '40%',
      top: '20%',
      left: '30%',
      right: '30%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 0'
    }
  }));

  interface Props {
      handleRecordDelete(id:string): void,
      location: string,
      id:string,
  }

const DeleteModal: React.FC<Props> = (props) => {
    const classes = useStyles();
    const context = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string | undefined>();
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName(undefined);
    };

    const handleDeleteJournalClick = () => {
        props.handleRecordDelete(props.id)
        handleClose();
    };

    const body = (
        <div  className={classes.paper} data-testid="deletejournalmodal">
          <h3 id="simple-modal-description">
            Are you sure you want to delete this entry? This cannot be undone.
          </h3>
          <div className={classes.buttonContainer}>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleDeleteJournalClick} data-testid="save">Continue</Button>
          </div> 
        </div>
      );

    return (
        <>
        <DeleteIcon size="30" onClick={handleOpen} data-testid={`${props.location}-addjournal`}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
        </>
    );
}

export default DeleteModal
