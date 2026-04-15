export default function Calendar({ tasks }) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDate = today.getDate()

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const monthName = today.toLocaleString('default', { month: 'long' })

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getTasksForDate = (date) => {
    if (!tasks) return []
    return tasks.filter(task => {
      if (!task.due_date) return false
      const taskDate = new Date(task.due_date)
      return (
        taskDate.getDate() === date &&
        taskDate.getMonth() === currentMonth &&
        taskDate.getFullYear() === currentYear
      )
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Merge Calendar</h3>
      <div className="text-center mb-4">
        <h4 className="text-xl font-medium">{monthName} {currentYear}</h4>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        <div>SUN</div>
        <div>MON</div>
        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
        <div>SAT</div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex flex-col items-center justify-center text-sm rounded-lg ${
              day === currentDate
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            } ${!day ? 'invisible' : ''}`}
          >
            {day && (
              <>
                <span>{day}</span>
                {getTasksForDate(day).length > 0 && (
                  <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h5 className="text-sm font-medium text-gray-900 mb-3">Upcoming Tasks</h5>
        <div className="space-y-2">
          {tasks
            .filter(task => task.due_date)
            .slice(0, 3)
            .map(task => (
              <div key={task.id} className="flex items-center justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-gray-500">
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          {tasks.filter(task => task.due_date).length === 0 && (
            <p className="text-gray-500 text-sm">No upcoming tasks</p>
          )}
        </div>
      </div>
    </div>
  )
}