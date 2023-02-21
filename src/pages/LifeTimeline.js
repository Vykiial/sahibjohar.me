import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css'
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const LifeTimeline = () => {
  return (
    <div className="experience">
      <VerticalTimeline lineColor="#967969">
      <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="Septemeber 2018 - June 2022"
          iconStyle={{background: '#D2B48C', color: '#fff'}}
          icon={<SchoolIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            Stouffville District Secondary School | Whitchurch-Stouffville, Ontario
          </h3>
          <p>High School Diploma</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="June 2019 - September 2020"
          iconStyle={{background: '#967969', color: '#fff'}}
          icon={<WorkIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            Senior Sandwich Artist | North York, Ontario
          </h3>
          <p>Subway Sandwiches</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="October 2020 - Febuary 2021"
          iconStyle={{background: '#967969', color: '#fff'}}
          icon={<WorkIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            Business and Marketing Intern | Whitchurch-Stouffville, Ontario
          </h3>
          <p>Swob Inc.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="July 2021 - August 2022"
          iconStyle={{background: '#967969', color: '#fff'}}
          icon={<WorkIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            Team Lead | Whitchurch-Stouffville, Ontario
          </h3>
          <p>McDonald's</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="Septemeber 2022 - April 2027 (Expected)"
          iconStyle={{background: '#D2B48C', color: '#fff'}}
          icon={<SchoolIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            Univeristy of Waterloo | Waterloo, Ontario
          </h3>
          <p>Computer Science</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="Septemeber 2022 - April 2027 (Expected)"
          iconStyle={{background: '#D2B48C', color: '#fff'}}
          icon={<SchoolIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            Wilfrid Laurier University | Waterloo, Ontario
          </h3>
          <p>Business Administration</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement 
          className="vertical-timeline-element--education"
          date="September 2022 - Now"
          iconStyle={{background: '#967969', color: '#fff'}}
          icon={<WorkIcon />}
        >
          <h3 
            className="vertical-timeline-element-title"
          >
            AVIT Support Specialist | Waterloo, Ontario
          </h3>
          <p>Wilfrid Laurier University</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  )
}

export default LifeTimeline