import GithubIcon from '@mui/icons-material/GitHub';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import Email from '@mui/icons-material/Email';

export const Home = () => {
  return (
    <div className='home'>
      <div className='about'>
        <h2>Hi, my name is Sahib</h2>
        <div className="prompt">
          <p>I'm a software developer in the pursuit of all things tech.</p>
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
        </div>
      </div>
      <div className='skills'>
        <h1>Skills</h1>
        <ol className='list'>
          <li className='item'>
            <h2>Technical Skills</h2>
            <span>Placeholder Stuff</span>
          </li>
          <li className='item'>
            <h2>Soft Skills</h2>
            <span>Placeholder Stuff</span>
          </li>
          <li className='item'>
            <h2>Programming Languages</h2>
            <span>Placeholder Stuff</span>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default Home