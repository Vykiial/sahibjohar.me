import { useParams } from 'react-router-dom';
import { ProjectList } from '../assets/ProjectList';
import GithubIcon from '@mui/icons-material/GitHub';

const ProjectDisplay = () => {
    const { id } = useParams();
    const project = ProjectList[id];

  return (
    <div className='project'>
        <h1>{project.name}</h1>
        <img src={project.image} />
        <p>Skills: {project.skills}</p>
        <GithubIcon />
    </div>
  )
}

export default ProjectDisplay;