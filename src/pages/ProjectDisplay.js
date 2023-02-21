import { useParams } from 'react-router-dom';
import { ProjectList } from '../assets/ProjectList';
import Launch from '@mui/icons-material/Launch';

const ProjectDisplay = () => {
    const { id } = useParams();
    const project = ProjectList[id];

  return (
    <div className='project'>
        <h1>{project.name}</h1>
        <img src={project.image} />
        <p>Skills: {project.skills}</p>
        <a 
          href={project.link} 
          target='_blank'
          rel='noreferrer'
        >
          <Launch id="linkButton"/>
        </a>
    </div>
  )
}

export default ProjectDisplay;