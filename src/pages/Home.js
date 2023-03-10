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
            <span>Bash, Git, GitHub, Microsoft Office (Excel, PowerPoint, etc), Photoshop, Ticketing Softwares, Problem-Solving Skills, Various Math Skills (Discrete Math, Calculus 1, Calculus 2, Linear Algebra), Data Analysis, an Aptitude for Research. </span>
          </li>
          <li className='item'>
            <h2>Soft Skills</h2>
            <span>Great Teamwork, Excellent Communication, Self-Awareness, Self-Learning, Accountability, Time Managment, Critical Thinking Skills, Adaptability, Approachability, Helpful, Patience, Open-Mindedness.</span>
          </li>
          <li className='item'>
            <h2>Programming Languages</h2>
            <span>Java, JavaScript, React, React Native, Python, Racket, Scheme, C, HTML, CSS.</span>
          </li>
          <li className='item'>
            <h6>For an in-depth look into my skills, please take a look at my resume located in the footer of the page.</h6>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default Home