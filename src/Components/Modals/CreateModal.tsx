import Button from '../../Components/Button/Button';
import Input from '../Input/LoginInput';
import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AppContext from '../../context/context';
import axios from 'axios';
import { AddIcon } from '../../Components/Icons/Icons'

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
      getJournals(): void,
      location: string
  }

  

const CreateModal: React.FC<Props> = (props) => {
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

    const postJournal = async (journal: any) => {
        await axios.post(`${context.API_BASE_URL}/api/v1/journal`, journal, config)
    };

    const handleNewJournalClick = () => {
        // let name: string = "";
        // let names: string[] = context.journals.flatMap(j => j.journal_name);
        // while (name === "" || names.includes(name)) {
        //     name = String(window.prompt("Journal name must be unique and nonempty!"));
        // }
        let newJournal = {
            journal_name: name
        };
        if (name !== undefined && name?.length > 0) {
            postJournal(newJournal).then((res) => props.getJournals())
            handleClose();
        }
    };

    const body = (
        <div  className={classes.paper} data-testid="createjournalmodal">
          <h2 id="simple-modal-title" data-testid="modaltitle">Create a New Journal</h2>
          <p id="simple-modal-description">
            Create a journal to organize the entries that you create.
          </p>
          <Input placeholder="Journal Name" value={name} style={{width: '80%'}} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
          <div className={classes.buttonContainer}>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleNewJournalClick} data-testid="save">Save</Button>
          </div> 
        </div>
      );

    return (
        <>
        <AddIcon size="30" onClick={handleOpen} data-testid={`${props.location}-addjournal`}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                data-testid={`${props.location}-modal`}
                >
                {body}
            </Modal>
        </>
    );
}

export default CreateModal
