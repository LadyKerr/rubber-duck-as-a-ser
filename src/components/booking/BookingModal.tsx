import { useState } from 'react'
import { Duck, SessionType } from '../../types/duck'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarDays, Clock } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { cn } from '../../lib/utils'

interface BookingModalProps {
  duck: Duck | null
  sessionType: SessionType | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookingData: any) => void
}

export function BookingModal({ duck, sessionType, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')
  const [duration, setDuration] = useState<string>('1')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!duck || !sessionType) return null

  const getSessionTypePrice = (type: SessionType) => {
    const multiplier = type === 'career' ? 1.2 : type === 'existential' ? 0.8 : 1
    return Math.round(duck.hourlyRate * duck.mood.priceModifier * multiplier)
  }

  const totalCost = getSessionTypePrice(sessionType) * parseInt(duration || '1')

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  const handleSubmit = async () => {
    if (!date || !time || !duration) return

    setIsSubmitting(true)
    
    const bookingData = {
      duckId: duck.id,
      duckName: duck.name,
      sessionType,
      date: format(date, 'yyyy-MM-dd'),
      time,
      duration: parseInt(duration),
      description,
      cost: totalCost
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    onConfirm(bookingData)
    setIsSubmitting(false)
    
    setDate(undefined)
    setTime('')
    setDuration('1')
    setDescription('')
  }

  const getSessionTypeTitle = (type: SessionType) => {
    switch (type) {
      case 'debugging': return 'Debugging Session'
      case 'career': return 'Career Counseling'
      case 'existential': return 'Existential Support'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <span className="text-xl sm:text-2xl">{duck.image}</span>
            <span className="truncate">
              Book {getSessionTypeTitle(sessionType)} with {duck.name}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <div className="text-xs text-muted-foreground text-center">
                or
              </div>
              <Input
                type="date"
                value={date ? format(date, 'yyyy-MM-dd') : ''}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value + 'T00:00:00') : undefined
                  setDate(selectedDate)
                }}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duration (hours)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Session Description (Optional)</Label>
            <Textarea
              placeholder="Describe what you'd like help with..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Total Cost:</span>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-primary">${totalCost}</span>
                {duck.mood.priceModifier !== 1.0 && (
                  <div className="text-xs text-muted-foreground">
                    {duck.mood.priceModifier < 1.0 ? "Discount applied!" : "Premium pricing"}
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSubmit}
              disabled={!date || !time || !duration || isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}