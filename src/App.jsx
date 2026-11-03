import { useState} from "react";
import './App.css'

const initialProjects = [
  {
  id: 1,
  name: 'Skyline Residency',
  location: 'Mumbai, Maharashtra',
  type: 'Residential',
  progress: 68,
  budget: 8500000,
  spent: 5720000,
  status: 'In Progress',
  },
  {
  id: 2,
  name: 'Greenfield Commercial Complex',
  location: 'Pune, Maharashtra',
  type: 'Commercial',
  progress: 42,
  budget: 12000000,
  spent: 4960000,
  status: 'In Progress',
  },
  {
  id: 3,
  name: 'Riverside Apartments',
  location: 'Navi Mumbai, Maharashtra',
  type: 'Residential',
  progress: 84,
  budget: 6500000,
  spent: 5330000,
  status: 'In Progress',
  },
]

const initialTasks = [
  {
  id: 1,
  name: 'Foundation and excavation',
  project: 'Skyline Residency',
  due: '2026-10-23',
  priority: 'Medium',
  status: 'Completed',
  progress: 100,
  },
  {
  id: 2,
  name: 'Ground floor concrete pouring',
  project: 'Skyline Residency',
  due: '2026-10-25',
  priority: 'High',
  status: 'At Risk',
  progress: 45,
  },
  {
  id: 3,
  name: 'Electrical installation',
  project: 'Greenfield Commercial Complex',
  due: '2026-10-28',
  priority: 'High',
  status: 'In Progress',
  progress: 55,
  },
  {
  id: 4,
  name: 'Interior finishing',
  project: 'Riverside Apartments',
  due: '2026-10-30',
  priority: 'Low',
  status: 'Pending',
  progress: 0,
  },
]

const initialMaterials = [
  {
    id: 1,
    name: 'Cement',
    quantity: '500 bags available',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Steel Reinforcement',
    quantity: 'Delivery confirmation pending',
    status: 'At Risk',
  },
  {
    id: 3,
    name: 'Sand',
    quantity: 'Low stock',
    status: 'Low Stock',
  },
]


const initialRisks = [

  {
  id: 1,
  title: 'Concrete delivery not confirmed',
  project: 'Skyline Residency',
  severity: 'High',
  description: 'Concrete pouring is scheduled for 25 October, but delivery confirmation is still pending.',

  evidence: [
          'Concrete pouring deadline: 25 October 2026',
          'Material delivery confirmation: Pending',
          'Task progress: 45%',
  ],

  actions: [
          'Contact the existing supplier and confirm the delivery time.',
          'Investigate an alternative supplier and verify cost and quality.',
          'Review whether another ready task can be rescheduled.',
  ],
  selectedAction: '',
  owner: '',
  dueDate: '',
  decisionStatus: 'Needs Review',
  },

  {
  id: 2,
  title: 'Budget utilisation needs attention',
  project: 'Greenfield Commercial Complex',
  severity: 'Medium',
  description:
  'A substantial portion of the project budget has been used while the project remains in progress.',
  
  evidence: [
  'Budget: ₹1.20 crore',
  'Recorded expenditure: ₹49.60 lakh',
  'Reported progress: 42%',
  ],
  actions: [
  'Review the latest expenses against the project budget.',
  'Check upcoming purchase commitments.',
  'Update the cost forecast using verified project records.',
  ],
  selectedAction: '',
  owner: '',
  dueDate: '',
  decisionStatus: 'Needs Review',
  },
]

const navigation = [ 
  { label: 'Dashboard', icon: '▦' }, 
  { label: 'Projects', icon: '▤' }, 
  { label: 'Tasks & Schedule', icon: '☷' }, 
  { label: 'Resources', icon: '▧' }, 
  { label: 'Risk Alerts', icon: '△' }, 
  { label: 'Decision Support', icon: '◇' }, 
]

function formatCurrency(amount){

  if(amount >= 10000000){
    return `₹${(amount / 10000000).toFixed(2)} Cr`
  }

  if(amount >= 100000){
    return `₹${(amount / 100000).toFixed(2)} L`
  }
return `₹${amount.toLocaleString('en-IN')}`
}

function App(){
  const [activePage, setActivePage] = useState('Dashboard') 
  const [projects] = useState(initialProjects) 
  const [tasks, setTasks] = useState(initialTasks) 
  const [risks] = useState(initialRisks)
  const [materials] = useState(initialMaterials) 
  const [selectedAction, setSelectedAction] = useState('') 
  const [actionOwner, setActionOwner] = useState('') 
  const [followUpDate, setFollowUpDate] = useState('') 
  const [savedDecision, setSavedDecision] = useState(null) 
  const [search, setSearch] = useState('')

  const totalBudget = projects.reduce(
    (total, project) => total + project.budget,
    0,
  )     
  
  const totalSpent = projects.reduce( 
    (total, project) => total + project.spent, 
    0, 
  )

  const overdueTasks = tasks.filter( 
    (task) => 
      task.status !== 'Completed' && 
      new Date(`${task.due}T23:59:59`) < new Date(), 
  )

  const atRiskMaterials = materials.filter( 
    (material) => material.status !== 'Available', 
  )

  const filteredProjects = projects.filter(
    (project) => project.name.toLowerCase().includes(search.toLowerCase()), 
  )

  const filteredTasks = tasks.filter(
    (task) => 
      `${task.name} ${task.project}`.toLowerCase().includes(search.toLowerCase()), 
  )

  function toggleTask(taskId) { 
    setTasks((currentTasks) => 
      currentTasks.map((task) => 
        task.id === taskId 
        ? { ...task, 
          status: task.status === 'Completed' ? 'Pending' : 'Completed', 
        } 
        : task, 
      ), 
    ) 
  } 
  
  function saveDecision(event) { 
    event.preventDefault() 
    if (!selectedAction || !actionOwner.trim() || !followUpDate) { 
      return 
    } 
    
    setSavedDecision({ 
      action: selectedAction, 
      owner: actionOwner.trim(), 
      date: followUpDate, 
      status: 'Action recorded', 
    }) 
  }

function renderDashboard(){
  return (
    <>
    <section className="welcome-banner"> 
      <div> 
        <span className="eyebrow">PROJECT OVERVIEW</span> 

        <h2>Good evening, Project Manager.</h2> 

            <p> Here's what's happening across your construction projects today.</p> 
      </div>
          <button className="primary-button" 
                  onClick={() => setActivePage('Projects')} 
                  > 
                  View projects 
                  <span aria-hidden="true">→</span> 
          </button>
    </section>

    <section className="stats-grid"> 
      <article className="stat-card"> 
        <div className="stat-top"> 
          <span className="stat-icon blue">P</span> 
          <span className="stat-caption">PROJECTS</span> 
        </div> 
        <h3>{projects.length}</h3> 
        <p>Across all locations</p> 
        </article> 

        <article className="stat-card"> 
          <div className="stat-top"> 
            <span className="stat-icon green">↗</span> 
            <span className="stat-caption">AVERAGE PROGRESS</span> 
          </div> 
        <h3> {Math.round( projects.reduce((total, project) => total + project.progress, 0) / projects.length, )} % </h3> 
        <p>Across active projects</p> 
        </article> 

        <article className="stat-card"> 
          <div className="stat-top"> 
            <span className="stat-icon purple">₹</span> 
            <span className="stat-caption">TOTAL BUDGET</span> 
          </div> 
          <h3>{formatCurrency(totalBudget)}</h3> 
          <p>Approved project budgets</p> 
        </article> 

        <article className="stat-card"> 
          <div className="stat-top"> 
            <span className="stat-icon orange">!</span> 
            <span className="stat-caption">RISK ALERTS</span> 
          </div> 
        <h3>{atRiskMaterials.length + overdueTasks.length}</h3> 
        <p>Items requiring review</p> 
        </article> 
      </section> 


      <section className="content-grid"> 
        <article className="panel projects-panel"> 
          <div className="panel-heading"> 
            <div> 
              <h3>Project progress</h3> 
              <p>Monitor work across your sites</p> 
            </div> 
            <button className="text-button" onClick={() => setActivePage('Projects')} 
              > 
              View all → 
              </button> 
            </div> 
            <div className="project-list"> 

              {projects.map((project) => ( 

                <div className="project-progress" key={project.id}> 
                <div className="project-row"> 
                  <div> 
                    <strong>{project.name}</strong> 
                    <span>{project.location}</span> 
                  </div> 
                  
                    <strong className="progress-number"> {project.progress}% </strong> 
                    
                  </div> 
                  <div className="progress-track"> 
                    <div className="progress-fill" style={{ width: `${project.progress}%` }} 
                    /> 
                    </div> 
                  <div className="project-footer"> 
                      <span>{project.status}</span> 
                      <span>{formatCurrency(project.spent)} spent</span> 
                  </div> 
                  </div> 
                  )
                )
              } </div> 
        </article> 
        
        <article className="panel alerts-panel"> 
          <div className="panel-heading"> 
            <div> 
              <h3>Needs attention</h3> 
              <p>Potential project blockers</p> 
            </div> 
            <span className="alert-count">{atRiskMaterials.length + overdueTasks.length}</span> 
            </div> {overdueTasks.length > 0 && ( 
              <div className="alert-item"> 
              <span className="alert-symbol red">!</span> 
              <div> 
                <strong>Overdue task</strong> 
                <p> {overdueTasks[0].name} needs an updated status. </p> 
                <button className="text-button" onClick={() => setActivePage('Tasks & Schedule')} 
                  > 
                  Review task → 
                </button> 
              </div>
              </div> 
              )} 
              {atRiskMaterials.map((material) => ( 
                <div className="alert-item" key={material.id}> 
                  <span className="alert-symbol amber">!</span> 
                    <div> 
                      <strong>{material.name}</strong> 
                        <p> {material.status === 'At Risk' ? 'Delivery confirmation is pending.' : 'Check stock before scheduling new work.'} </p> 
                        <button className="text-button" onClick={() => setActivePage('Risk Alerts')} 
                          > Investigate → 
                        </button> 
                      </div> 
                    </div> 
                    ))} 
                    {atRiskMaterials.length === 0 && overdueTasks.length === 0 && ( 
                      <p className="empty-message">No current issues to review.</p> 
                    )} 
        </article> 
      </section> 
      
      <section className="content-grid bottom-grid"> 
        <article className="panel"> 
          <div className="panel-heading"> 
            <div> 
              <h3>Budget overview</h3> 
              <p>Combined project expenditure</p> 
            </div> 
            <span className="status-pill">Within budget</span> 
          </div> 
          <div className="budget-figures"> 
            <div> 
              <span>Total spent</span> 
              <strong>{formatCurrency(totalSpent)}</strong> 
            </div> 
            <div> 
            <span>Remaining</span> 
              <strong>{formatCurrency(totalBudget - totalSpent)}</strong> 
            </div> 
          </div> 
          <div className="progress-track budget-track"> 
            <div className="progress-fill" style={{ 
              width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`, 
            }} /> 
            </div> 
              <p className="small-note"> 
                {Math.round(
                  (totalSpent / totalBudget) * 100)
                }% of the combined budget has been spent. </p> 
        </article> 
        <article className="panel"> 
          <div className="panel-heading"> 
            <div> 
              <h3>Quick actions</h3> 
                <p>Go directly to a project area</p> 
            </div> 
          </div> 
          <div className="quick-actions"> 
            <button onClick={() => setActivePage('Projects')}> 
              <span>01</span> View projects <b>→</b> 
            </button> 
            <button onClick={() => setActivePage('Tasks & Schedule')}> 
              <span>02</span> Review tasks <b>→</b> 
            </button> 
            <button onClick={() => setActivePage('Decision Support')}> 
              <span>03</span> Open decision support <b>→</b> 
            </button> 
          </div> 
        </article> 
      </section> 
      </> 
      )
}

function renderProjects() { 
  return ( 
  <section className="panel"> 
  <div className="panel-heading"> 
    <div> 
      <h3>All projects</h3> 
      <p>Project details and current construction progress</p> 
    </div> 
      <span className="status-pill">{projects.length} projects</span> 
    </div> 
    <div className="table-wrapper"> 
      <table> 
        <thead> 
          <tr> 
            <th>Project</th> 
            <th>Progress</th> 
            <th>Budget</th> 
            <th>Spent</th> 
            <th>Status</th> 
            </tr> 
        </thead> 
        <tbody> 
          {filteredProjects.map((project) => ( 
            <tr key={project.id}> 
            <td> 
              <strong>{project.name}</strong> 
              <span className="table-subtitle">{project.location}</span>
            </td> 
            <td> 
              <div className="table-progress"> 
                <div className="progress-track"> 
                  <div className="progress-fill" style={{ width: `${project.progress}%` }} /> 
                  </div> 
              <span>{project.progress}%</span> 
              </div> 
            </td> 
            <td>{formatCurrency(project.budget)}</td> 
            <td>{formatCurrency(project.spent)}</td> 
            <td> 
              <span className="status-pill">{project.status}</span> 
            </td> 
            </tr> 
            )
          )
          } 
        </tbody> 
      </table> 
        {filteredProjects.length === 0 && ( 
          <p className="empty-message">No projects match your search.</p> )} 
    </div> 
  </section> 
  ) 
} 

function renderTasks() { 
  return ( 
  <section className="panel"> 
  <div className="panel-heading"> 
    <div> 
      <h3>Tasks & schedule</h3> 
      <p>Review deadlines and update task completion</p> 
    </div> 
      <span className="status-pill"> 
        {tasks.filter((task) => task.status === 'Completed').length} 
        completed 
      </span> 
    </div> 
    
  <div className="table-wrapper"> 
    <table> 
      <thead> 
        <tr>
          <th>Task</th> 
          <th>Project</th> 
          <th>Due date</th> 
          <th>Priority</th> 
          <th>Status</th> 
          <th>Update</th> 
        </tr> 
      </thead> 
      <tbody> 
        {filteredTasks.map((task) => { const overdue = task.status !== 'Completed' && new Date(`${task.due}T23:59:59`) < new Date() 
        return ( 
        <tr key={task.id}> 
        <td> 
          <strong>{task.name}</strong> {overdue && ( 
            <span className="table-subtitle overdue-text"> Overdue 
            </span> )} 
        </td> 
        <td>{task.project}</td>
        <td>{task.due}</td> 
        <td> 
          <span className={`priority ${task.priority.toLowerCase()}`}> {task.priority} </span> 
        </td> 
        <td> 
          <span className="status-pill">{task.status}</span> 
        </td> 
        <td> 
          <button className="small-button" 
            onClick={() => toggleTask(task.id)} 
            > {task.status === 'Completed' ? 'Reopen' : 'Complete'} 
          </button> 
        </td> 
        </tr> 
        ) 
      }
    )
    } 
      </tbody> 
    </table> 
      {filteredTasks.length === 0 && ( 
        <p className="empty-message">No tasks match your search.</p> 
      )
      } 
  </div> 
  </section> 
  ) 
} 

function renderResources() {
  return ( 
    <section className="panel"> 
      <div className="panel-heading"> 
        <div> 
          <h3>Materials & resources</h3> 
          <p>Sample material availability for active projects</p> 
        </div> 
          <span className="status-pill">{materials.length} materials</span> 
        </div> 
        <div className="resource-grid"> {materials.map((material) => ( 

          <article className="resource-card" key={material.id}> 
            <span className="resource-icon">M</span> 
              <h4>{material.name}</h4> 
              <p>{material.quantity}</p> 
            <span className={
              `status-pill ${ 
              material.status === 'Available' ? 'good' :
              material.status === 'At Risk' ? 'danger' : 'warning' }`
              } 
              > 
              {
              material.status
                } 
            </span> 
          </article> 
        )
        
      )
    } 
        
      </div> 
        <div className="notice-box"> 
          <strong>Resource planning note</strong> 
          <p> Material availability should be checked before dependent work is scheduled. These sample records are for demonstration purposes. </p> 
      </div> 
    </section> 
  ) 
} 

function renderRiskAlerts() { 
  return ( 
    <> 
      <section className="welcome-banner compact-banner"> 
        <div> 
          <span className="eyebrow">RISK MONITORING</span> 
            <h2>Identify issues before they escalate.</h2> 
            <p> Rule-based alerts use the sample task dates and material statuses. </p> 
        </div> 
      </section> 
      
      <section className="risk-list"> 

        {risks.map((risk) => (
        <article className="panel risk-card" key={risk.id}>

          <div className="risk-heading">
            <span className="alert-symbol amber">!</span>

            <div>
              <span className="eyebrow">PROJECT RISK</span>
              <h3>{risk.title}</h3>
              <p>{risk.project}</p>
            </div>
          </div>

          <span className="risk-label high-risk">
            {risk.severity} Risk
          </span>

          <p>{risk.description}</p>

          <div className="notice-box">
            <strong>Evidence behind this alert</strong>

            {risk.evidence.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>

          <div className="notice-box">
            <strong>Recommended actions</strong>

            {risk.actions.map((action, index) => (
              <p key={index}>
                {index + 1}. {action}
              </p>
            ))}
          </div>

          <span className="status-pill">
            {risk.decisionStatus}
          </span>

        </article>
      ))}
        
        {overdueTasks.map((task) => ( 

        <article className="panel risk-card" key={task.id}> 
          <div className="risk-heading"> 
            <span className="alert-symbol red">!</span> 
              <div> 
                <span className="eyebrow">SCHEDULE RISK</span> 
                <h3>{task.name}</h3> 
                <p>{task.project} · Due {task.due}</p> 
              </div>
          </div> 
            <span className="risk-label high-risk">Overdue</span> 

          <div className="notice-box"> 
            <strong>Why was this flagged?</strong> 
              <p> The task deadline has passed, but the task is not marked as completed. Confirm the latest site status. </p> 
          </div> 
              
          <button className="primary-button" 
            onClick={() => setActivePage('Tasks & Schedule')} 
            > Review task 
          </button> 
        </article> 
        ))}

        
        {materials .filter((material) => material.status !== 'Available') .map((material) => ( 
        
        <article className="panel risk-card" key={material.id}> 
          <div className="risk-heading"> 
            <span className="alert-symbol amber">!</span> 
              <div> 
                <span className="eyebrow">RESOURCE RISK</span> 
                  <h3>{material.name}</h3> <p>Material status: {material.status}</p> 
              </div> 
          </div> 

          <div className="notice-box"> 
            <strong>Why was this flagged?</strong> 
              <p> {material.status === 'At Risk' 
                    ? 'The delivery is not confirmed. Dependent tasks may be affected if the material does not arrive in time.' 
                    : 'Stock is marked low. Verify the quantity required for upcoming work before proceeding.'
                  } 
              </p>
          </div> 
          
          <button className="primary-button" 
            onClick={() => {
              setActivePage('Decision Support') 

            }} > Open decision support → 
          </button> 
        </article> 
        ))} 
        
        {overdueTasks.length === 0 && atRiskMaterials.length === 0 && ( 
          
          <div className="panel"> <p className="empty-message">No risks detected in the sample data.</p> 
          </div> 
        )} 
      </section> 
      
    </> 
  ) 
} 

function renderDecisionSupport() { 
  return ( 
    <div className="decision-layout"> 
      <section className="panel decision-main"> 
        <div className="panel-heading"> <div> 
          <span className="eyebrow">DECISION WORKSPACE</span> 
            <h3>Material delivery risk</h3> 
              <p>Residential Tower A · Concrete work</p> 
        </div> 
          <span className="risk-label high-risk">Needs review</span> 
        </div> 
    <div className="risk-summary"> 
      <span className="alert-symbol amber">!</span> 
      <div> 
        <strong>Required steel delivery is unconfirmed.</strong> 
        <p> The current sample record does not confirm when the material will arrive. Check the supplier's latest status before relying on the planned schedule. </p> 
      </div> 
    </div> 
            <h4 className="section-title">Evidence behind this alert</h4> 
    <div className="evidence-row"> 
      <span>Material</span> 
        <strong>Steel reinforcement</strong> 
          </div> 
    <div className="evidence-row"> 
      <span>Recorded status</span> 
        <strong className="overdue-text">Delivery unconfirmed</strong> 
    </div> 
    <div className="evidence-row"> 
      <span>Project</span> 
        <strong>Residential Tower A</strong> 
      </div> 
    <div className="evidence-row"> 
      <span>Data source</span> 
        <strong>Simulated demonstration record</strong> 
    </div> 
    <div className="notice-box"> 
      <strong>What is still unknown?</strong> 
        <p> The actual supplier ETA, available alternative stock, price difference and effect on the construction schedule have not been verified. The system cannot calculate a reliable delay or saving without these inputs. </p> 
    </div> 
        <h4 className="section-title">Possible actions to consider</h4> 
    <div className="action-options"> 
      {
      [ { 
        title: 'Confirm existing delivery', 
        description: 'Contact the supplier and request a confirmed delivery time.', 
        }, 
        { 
        title: 'Investigate an alternative supplier', 
        description: 'Compare availability, cost, delivery time and quality approval.', 
        }, 
        { 
          title: 'Review the work sequence', 
          description: 'Check whether another ready activity can proceed without disrupting dependencies.',
        }, 
      ].map((option) => ( 
        
      <button 
          key={option.title} 
          className={`action-option ${ 
            selectedAction === option.title ? 'selected' : '' 
            }`} 
          onClick={() => setSelectedAction(option.title)} 
          > 
          
          <span className="radio-mark"> {selectedAction === option.title ? '●' : ''} </span> 
          <span> 
        <strong>{option.title}</strong> 
        <p>{option.description}</p> </span> 
      </button> ))} 
    </div> 
    
    <form className="decision-form" onSubmit={saveDecision}> 
      <h4 className="section-title">Record manager's decision</h4> 
        <label htmlFor="action-owner">Responsible person</label> 
          <input id="action-owner" value={actionOwner} onChange={(event) => setActionOwner(event.target.value)} placeholder="Enter name or role" required /> 
            <label htmlFor="follow-up-date">Follow-up date</label> 
              <input 
                id="follow-up-date" 
                type="date" 
                value={followUpDate} 
                onChange={(event) => 
                  setFollowUpDate(event.target.value)} required /> 

        <button type="submit" className="primary-button" disabled={!selectedAction} > Record decision 
        </button> 
    </form> {savedDecision && ( 
      
      <div className="success-box" role="status"> 
        <strong>Decision recorded in this session</strong> 
          <p>Action: {savedDecision.action}</p> 
          <p>Responsible person: {savedDecision.owner}</p> 
          <p>Follow-up: {savedDecision.date}</p> 
          <p>Status: {savedDecision.status}</p> 
        <span> This demonstration record is temporary and is not saved to a database. </span> 
      </div> )} 
      
    </section> 
    <aside className="panel decision-side"> 
      <span className="eyebrow">HOW IT WORKS</span> 
      <h3>From risk to action</h3> 
      {[ 
        ['01', 'Detect', 'A rule identifies a potential problem.'], 
        ['02', 'Explain', 'The relevant records and missing information are shown.'], 
        ['03', 'Compare', 'The manager reviews possible responses.'], 
        ['04', 'Approve', 'A person chooses the action and assigns ownership.'], 
        ['05', 'Track', 'The action receives a follow-up date.'],
      ].map(([number, title, description]) => ( 
      
      <div className="workflow-step" key={number}> 
        <span>{number}</span> 
          <div> 
            <strong>{title}</strong> 
              <p>{description}</p>
          </div>
      </div> 
    ))} 
      <div className="notice-box"> 
        <strong>Human oversight</strong> 
          <p> NirmaanTech supports decisions. It does not automatically approve purchases, change budgets or replace professional judgement. </p> 
      </div> 
    </aside> 
  </div> 
) 
} 

const pageDescriptions = { 
  Dashboard:'A clear view of project health, progress and potential blockers.', 
  Projects: 'Review progress and budgets across your construction projects.', 
            'Tasks & Schedule': 'Monitor deadlines and track work completion.', 
  Resources:'Review material availability and resource-related concerns.', 
            'Risk Alerts': 'Understand which project records may require attention.', 
            'Decision Support': 'Connect evidence-backed risks with a human-reviewed action.', 
  } 
  
function renderPage() { 
  switch (activePage) { 
    case 'Projects': 
      return renderProjects() 
    case 'Tasks & Schedule': return renderTasks() 
    case 'Resources': return renderResources() 
    case 'Risk Alerts': return renderRiskAlerts() 
    case 'Decision Support': return renderDecisionSupport() 
    default: return renderDashboard() 
  } 
} 

return ( 
  <div className="app-shell"> 
    <aside className="sidebar"> 
      <div className="brand"> 
        <div className="brand-mark">N
        </div> 
        <div> 
          <h1>NirmaanTech</h1> 
          <span>CONSTRUCTION INTELLIGENCE</span> 
        </div> 
      </div>
    <div className="workspace-label">WORKSPACE</div> 
      <nav className="side-nav" aria-label="Main navigation"> {navigation.map((item) => ( 
        <button key={item.label} className={`nav-item ${ activePage === item.label ? 'active' : '' }`} onClick={() => setActivePage(item.label)} > 
        <span className="nav-icon" aria-hidden="true"> {item.icon} 
        </span> {item.label} {item.label === 'Risk Alerts' && ( 
          <span className="nav-badge"> {atRiskMaterials.length + overdueTasks.length} 
          </span> )} 
        </button> ))} 
      </nav> 
    <div className="sidebar-bottom"> 
      <div className="demo-indicator">
        <span />     
          <div> 
            <strong>Demo environment</strong> 
            <p>Sample construction data</p> 
          </div> 
      </div> 
      <div className="profile"> 
        <div className="profile-avatar">PM</div> 
        <div> 
            <strong>Project Manager</strong> 
            <span>Workspace administrator</span> 
        </div> 
      </div> 
    </div>
    </aside> 
              
      <main className="main-area"> 
        <header className="topbar"> 
          <div className="breadcrumb"> 
            <span>Workspace</span> 
            <span className="breadcrumb-separator">/</span> 
              <strong>{activePage}</strong> 
          </div> 
          <div className="topbar-actions"> 
              <label className="search-box"> 
                <span aria-hidden="true">⌕</span> 
                  <input type="search" placeholder="Search projects or tasks" value={search} 
                    onChange={(event) => setSearch(event.target.value)} 
                    aria-label="Search projects or tasks" /> 
              </label> 
                <span className="date-label"> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', })} 
                </span> 
          </div> 
        </header> 
          <div className="page-content"> 
            <div className="page-heading"> 
              <div> 
                <span className="eyebrow">NIRMAANTECH / MANAGEMENT</span> 
                  <h1>{activePage}</h1> 
                  <p>{pageDescriptions[activePage]}</p> 
              </div> 
              <div className="live-status"> 
                <span /> 
                Prototype 
              </div> 
            </div> 
            
            {renderPage()} 
                  
            <footer className="app-footer"> 
              <span>NirmaanTech</span> 
              <span> MVP demonstration · All project data shown is simulated </span> 
            </footer> 
          </div> 
        </main> 
    </div> 
  ) 
} 
export default App