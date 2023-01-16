import GithubIcon from '@mui/icons-material/GitHub';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import Email from '@mui/icons-material/Email';

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
        </div>
        <p> &copy; 2022 sahibjohar.com</p>
    </div>
  )
}

export default Footer