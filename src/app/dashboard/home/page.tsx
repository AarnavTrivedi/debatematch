"use client"

import { useState, useEffect, useCallback } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import LoginGate from "@/components/Dashboard/LoginGate"
import { 
  Play,
  Target,
  Brain,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Flame
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CourseProvider } from "@/context/course-context"
import Link from "next/link"
import { getTotalPracticeTime, getQuestionsAnswered, getCorrectQuestions, getTodayActivity, getUserStreakInfo, updateDailyGoal, getWeeklyStreakData, updateDailyLoginActivity } from "@/lib/supabase/test-results"
import { QuestionTestScreen } from "@/components/question-test-dialog"

interface Question {
  id: string
  label: string
  unit: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  subject: string
}

// Removed mock questions - now using real data from Question Bank API

const DailyGoal = () => {
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0)
  const [dailyTarget, setDailyTarget] = useState<number>(20)
  const [goalAchieved, setGoalAchieved] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newGoal, setNewGoal] = useState<string>("")
  
  useEffect(() => {
    const loadDailyProgress = async () => {
      try {
        setIsLoading(true)
        
        // Get today's activity and user's goal
        const [todayActivity, userInfo] = await Promise.all([
          getTodayActivity(),
          getUserStreakInfo()
        ])
        
        console.log('🔍 DailyGoal component data:', {
          todayActivity,
          userInfo,
          questionsAnswered: todayActivity.questions_answered,
          dailyGoal: userInfo.daily_goal_questions
        })
        
        setQuestionsAnswered(todayActivity.questions_answered || 0)
        setDailyTarget(userInfo.daily_goal_questions || 20)
        setGoalAchieved(todayActivity.goal_achieved || false)
        setNewGoal((userInfo.daily_goal_questions || 20).toString())
      } catch (error) {
        console.error('Error loading daily progress:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDailyProgress()
  }, [])

  const progress = dailyTarget > 0 ? Math.min(Math.round((questionsAnswered / dailyTarget) * 100), 100) : 0

  const handleEditGoal = () => {
    setIsEditing(true)
  }

  const handleSaveGoal = async () => {
    try {
      const goalValue = parseInt(newGoal)
      if (goalValue > 0 && goalValue <= 100) {
        await updateDailyGoal(goalValue)
        setDailyTarget(goalValue)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  const handleCancelEdit = () => {
    setNewGoal(dailyTarget.toString())
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <Card className="h-[280px]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Daily Goal</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-[280px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Daily Goal</CardTitle>
          <Clock className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex items-center justify-center px-6 py-4">
        {/* Circular Progress - Left Side */}
        <div className="flex-shrink-0 mr-8">
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                className="text-gray-100"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                className={`transition-all duration-500 ease-out ${
                  goalAchieved ? 'text-green-500' : 'text-blue-500'
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  goalAchieved ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {progress}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats and Edit Link - Right Side */}
        <div className="flex-1 flex flex-col justify-center space-y-3">
          <div>
            <div className={`text-3xl font-bold ${
              goalAchieved ? 'text-green-700' : 'text-gray-900'
            }`}>
              {questionsAnswered}/{dailyTarget}
            </div>
            <div className="text-base text-gray-500 font-medium">
              Problems Solved Today
              {goalAchieved && (
                <span className="ml-2 text-green-600 font-semibold">✓ Goal Achieved!</span>
              )}
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="100"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveGoal}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleEditGoal}
              className="text-green-600 hover:text-green-700 text-base font-medium transition-all duration-300 hover:scale-[1.02] text-left"
            >
              Edit Goal
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const StudyStreak = () => {
  const [currentStreak, setCurrentStreak] = useState<number>(0)
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const loadStreakData = async () => {
      try {
        setIsLoading(true)
        
        const [streakInfo, weekData] = await Promise.all([
          getUserStreakInfo(),
          getWeeklyStreakData()
        ])
        
        console.log('🔍 StudyStreak component data:', {
          streakInfo,
          weekData,
          currentStreak: streakInfo.current_streak
        })
        
        setCurrentStreak(streakInfo.current_streak || 0)
        setWeeklyData(weekData)
      } catch (error) {
        console.error('Error loading streak data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadStreakData()
  }, [])

  if (isLoading) {
    return (
      <Card className="h-[200px]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Study Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent className="h-[120px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500" />
        </CardContent>
      </Card>
    )
  }

  const activeDaysThisWeek = weeklyData.filter(day => day.hasActivity).length
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <Card className="h-[200px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Study Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent className="h-[120px] flex flex-col justify-between py-3">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
              <Flame className="h-5 w-5 text-orange-500 ml-2" />
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {currentStreak === 1 ? 'Day in a row' : 'Days in a row'}
            </div>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>This week</span>
            <span className="text-orange-600 font-semibold">{activeDaysThisWeek}/7 days</span>
          </div>
          <div className="flex space-x-1">
            {weeklyData.map((dayData, index) => (
              <div key={index} className="flex-1 h-2 bg-orange-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full shadow-sm transition-all duration-300 ${
                    dayData.hasActivity 
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500' 
                      : 'bg-orange-100'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ProblemList = () => {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState('AP Calculus AB')
  const [selectedUnit, setSelectedUnit] = useState('All Units')
  const [currentPage, setCurrentPage] = useState(1)
  const [showTestDialog, setShowTestDialog] = useState(false)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const [availableUnits, setAvailableUnits] = useState<string[]>([])
  const questionsPerPage = 10

  // AP Classes for filtering (same as Question Bank)
  const apClasses = [
    { value: 'AP Calculus AB', label: 'AP Calculus AB' },
    { value: 'AP Precalculus', label: 'AP Precalculus' },
    { value: 'AP Computer Science A', label: 'AP Computer Science A' },
    { value: 'AP Statistics', label: 'AP Statistics' },
    { value: 'AP World History', label: 'AP World History' },
    { value: 'AP US History', label: 'AP US History' },
    { value: 'AP US Government', label: 'AP US Government' },
    { value: 'AP Human Geography', label: 'AP Human Geography' },
    { value: 'AP Psychology', label: 'AP Psychology' },
    { value: 'AP Microeconomics', label: 'AP Microeconomics' },
    { value: 'AP Chemistry', label: 'AP Chemistry' },
    { value: 'AP Biology', label: 'AP Biology' },
    { value: 'AP Environmental Science', label: 'AP Environmental Science' },
    { value: 'AP Physics 1', label: 'AP Physics 1: Algebra-Based' },
    { value: 'AP Physics C: Mechanics', label: 'AP Physics C: Mechanics' },
  ]

  // Fallback units by class (same as Question Bank)
  const unitsByClass: Record<string, string[]> = {
    'AP Calculus AB': [
      'Limits & Continuity', 'Derivatives', 'Integrals', 'Applications of Integrals',
      'Differential Equations', 'Applications of Derivatives'
    ],
    'AP Statistics': [
      'Exploring One-Variable Data', 'Exploring Two-Variable Data', 'Collecting Data',
      'Probability, Random Variables, and Probability Distributions', 'Sampling Distributions',
      'Inference for Categorical Data: Proportions', 'Inference for Quantitative Data: Means',
      'Inference for Categorical Data: Chi-Square', 'Inference for Quantitative Data: Slopes'
    ],
    'AP Computer Science A': [
      'Primitive Types', 'Using Objects', 'Boolean Expressions and if Statements',
      'Iteration', 'Writing Classes', 'Array', 'ArrayList', '2D Array', 'Inheritance', 'Recursion'
    ],
    'AP Precalculus': [
      'Polynomial and Rational Functions', 'Exponential and Logarithmic Functions',
      'Trigonometric and Polar Functions', 'Functions Involving Parameters, Vector, and Matrix Quantities'
    ],
  }

  // Get unit options (same logic as Question Bank)
  const unitOptions = ["All Units", ...(availableUnits.length > 0 ? availableUnits : (unitsByClass[selectedClass] || []))]

  // Fetch available units for the selected class from database (same as Question Bank)
  const fetchAvailableUnits = useCallback(async (className: string) => {
    try {
      const response = await fetch(`/api/questions/units?class=${encodeURIComponent(className)}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableUnits(data.units || [])
      } else {
        // Fallback to hardcoded units if API fails
        setAvailableUnits([])
      }
    } catch (error) {
      console.error('Error fetching units:', error)
      setAvailableUnits([])
    }
  }, [])

  // Fetch available units when class changes (same as Question Bank)
  useEffect(() => {
    fetchAvailableUnits(selectedClass)
    // Reset unit selection when class changes
    setSelectedUnit('All Units')
  }, [selectedClass, fetchAvailableUnits])

  // Fetch questions from Supabase
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true)
      setError(null)
      setQuestions([])
      
      try {
        const params = new URLSearchParams()
        params.set('class', selectedClass)
        if (selectedUnit !== 'All Units') {
          params.set('unit', selectedUnit)
        }
        params.set('all', 'true')

        const response = await fetch(`/api/questions?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setQuestions(data.questions || [])
      } catch (err: any) {
        console.error('Error fetching questions:', err)
        setError(err.message || "Failed to load questions")
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [selectedClass, selectedUnit])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedClass, selectedUnit])

  const totalPages = Math.ceil(questions.length / questionsPerPage) || 1
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'  
      case 'hard': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const handleQuestionClick = (questionIndex: number) => {
    // Open the question directly in test dialog
    const globalIndex = (currentPage - 1) * questionsPerPage + questionIndex
    setSelectedQuestionIndex(globalIndex)
    setShowTestDialog(true)
  }

  const handlePracticeSet = () => {
    // Open practice set starting from first question
    if (questions.length > 0) {
      setSelectedQuestionIndex(0)
      setShowTestDialog(true)
    }
  }

  return (
    <Card className="h-[700px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Problem List</CardTitle>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white shadow-[0_4px_0_0_rgba(22,101,52,0.8)] hover:shadow-green-500/25 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 font-bold"
            onClick={handlePracticeSet}
            disabled={loading || questions.length === 0}
          >
            <Play className="h-4 w-4 mr-2" />
            Practice Set
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 h-[620px] flex flex-col">
        {/* Filter dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 truncate"
          >
            {apClasses.map(cls => (
              <option key={cls.value} value={cls.value}>{cls.label}</option>
            ))}
          </select>
          <select 
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 truncate"
          >
            {unitOptions.map(unit => (
              <option key={unit} value={unit} className="text-sm">{unit}</option>
            ))}
          </select>
        </div>

        {/* Question list */}
        <div className="space-y-2 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-sm font-medium">Error loading questions</p>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          ) : questions.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-sm font-medium">No questions found</p>
                <p className="text-xs">Try selecting a different subject or unit</p>
              </div>
            </div>
          ) : (
            currentQuestions.map((question, index) => (
              <div 
                key={question.id || index}
                onClick={() => handleQuestionClick(index)}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer hover:shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg px-2.5 py-1 min-w-[2.5rem] text-center">
                    Q{(currentPage - 1) * questionsPerPage + index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {question.unit || question.topic || 'Practice Question'}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {question.class || selectedClass}
                    </div>
                  </div>
                </div>
                <Badge 
                  className={`${getDifficultyColor(question.difficulty)} text-xs px-3 py-1 border-0 flex-shrink-0 shadow-sm font-medium`}
                >
                  {question.difficulty || 'Medium'}
                </Badge>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {questions.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            {/* <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
              Page {currentPage} of {totalPages} ({questions.length} questions)
            </span> */}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* Question Test Dialog */}
      {showTestDialog && questions.length > 0 && (
        <QuestionTestScreen
          questions={questions}
          startIndex={selectedQuestionIndex}
          onClose={() => setShowTestDialog(false)}
        />
      )}
    </Card>
  )
}

const TodaySchedule = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  })

  const subjects = [
    { name: 'Calculus', color: 'bg-blue-500', completed: false },
    { name: 'Statistics', color: 'bg-purple-500', completed: true },
  ]

  return (
    <Card className="h-[200px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{today}</CardTitle>
        <div className="text-sm text-gray-500">0/2 subjects completed</div>
      </CardHeader>
      <CardContent className="h-[120px] flex flex-col justify-between py-2">
        <div className="space-y-2 flex-1">
          {subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${subject.color} shadow-sm`} />
                <span className={`text-sm font-medium ${subject.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {subject.name}
                </span>
              </div>
              {subject.completed && (
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 border border-dashed border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-[1.02] mt-2 font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      </CardContent>
    </Card>
  )
}



export default function HomePage() {
  const [timeOfDay, setTimeOfDay] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 17) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")

    // Check authentication status and update daily activity
    const checkAuth = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      
      // If user is authenticated, update daily login activity
      if (session) {
        try {
          await updateDailyLoginActivity()
        } catch (error) {
          console.error('Error updating daily login activity:', error)
        }
      }
      
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const dashboardContent = (
    <div className="container h-full py-4 space-y-4 max-w-7xl flex flex-col relative z-10">
      {/* Header */}
      <div className="space-y-1 flex-shrink-0">
        <h1 className="text-3xl font-bold">Good {timeOfDay}! 👋</h1>
        <p className="text-gray-600 text-sm">Ready to ace your AP exams? Let's make today count!</p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="col-span-2 space-y-4">
          <DailyGoal />
          <TodaySchedule />
          <StudyStreak />
        </div>

        {/* Problem List - Main content area */}
        <div className="col-span-3">
          <ProblemList />
        </div>
      </div>
    </div>
  )

  return (
    <CourseProvider>
      <div className="h-screen bg-slate-50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-green-50/20 to-cyan-50/25 pointer-events-none" />
        {isAuthenticated ? (
          dashboardContent
        ) : (
          <LoginGate 
            title="Login to save your progress"
            description="Explore the dashboard, but sign in to track your daily goals and study streak!"
            className="h-full"
          >
            {dashboardContent}
          </LoginGate>
        )}
      </div>
    </CourseProvider>
  )
}