import GithubIcon from '@mui/icons-material/GitHub';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import Email from '@mui/icons-material/Email';
import Resume from '@mui/icons-material/AutoStories';

const Footer = () => {
  return (
    <div className="footer">
        <div className='socialMedia'>
            <a 
                href='https://github.com/Vykiial' 
                target='_blank'
                rel='noreferrer'
            >
                <GithubIcon />
            </a>
            <a 
                href='https://www.linkedin.com/in/sahibjohar/' 
                target='_blank'
                rel='noreferrer'
            >
                <LinkedinIcon />
            </a>
            <a 
                href='mailto: sahibjohar@gmail.com' 
                target='_blank'
                rel='noreferrer'
            >
                <Email />
            </a>
            <a 
                href='https://drive.google.com/file/d/1HV-Hr2JjP1vrm62WQKJV0YTWSWyraod9/view?usp=sharing' 
                target='_blank'
                rel='noreferrer'
            >
                <Resume />
            </a>
        </div>
        <p> &copy; 2022 sahibjohar.com</p>
    </div>
  )
}

export default Footer