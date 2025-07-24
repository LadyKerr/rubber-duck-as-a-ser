import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Search, Filter, X } from '@phosphor-icons/react'
import { Duck } from '../../types/duck'

interface DuckFiltersProps {
  onSearch: (query: string) => void
  onFilterSpecialty: (specialty: string | null) => void
  onFilterAvailability: (availability: Duck['availability'] | null) => void
  onFilterPriceRange: (range: [number, number] | null) => void
  activeFilters: {
    specialty: string | null
    availability: Duck['availability'] | null
    priceRange: [number, number] | null
  }
}

export function DuckFilters({ 
  onSearch, 
  onFilterSpecialty, 
  onFilterAvailability, 
  onFilterPriceRange,
  activeFilters 
}: DuckFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const specialties = [
    'Frontend Bugs', 'React Hooks', 'CSS Layout', 'Algorithms', 
    'System Design', 'Career Guidance', 'Existential Support', 
    'Backend Systems', 'Database Issues', 'Performance', 
    'Code Quality', 'Refactoring', 'AI/ML'
  ]

  const priceRanges = [
    { label: 'Under $50', value: [0, 49] as [number, number] },
    { label: '$50 - $65', value: [50, 65] as [number, number] },
    { label: '$65 - $80', value: [65, 80] as [number, number] },
    { label: 'Over $80', value: [80, 999] as [number, number] }
  ]

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    onSearch('')
    onFilterSpecialty(null)
    onFilterAvailability(null)
    onFilterPriceRange(null)
  }

  const hasActiveFilters = activeFilters.specialty || activeFilters.availability || activeFilters.priceRange || searchQuery

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search ducks by name, location, or description..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={activeFilters.specialty || 'all-specialties'} onValueChange={(value) => onFilterSpecialty(value === 'all-specialties' ? null : value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-specialties">All Specialties</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={activeFilters.availability || 'all-status'} onValueChange={(value) => onFilterAvailability(value === 'all-status' ? null : value as Duck['availability'])}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={activeFilters.priceRange ? `${activeFilters.priceRange[0]}-${activeFilters.priceRange[1]}` : 'all-prices'} 
          onValueChange={(value) => {
            if (value === 'all-prices') {
              onFilterPriceRange(null)
            } else {
              const range = priceRanges.find(r => `${r.value[0]}-${r.value[1]}` === value)
              onFilterPriceRange(range?.value || null)
            }
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-prices">All Prices</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={`${range.value[0]}-${range.value[1]}`} value={`${range.value[0]}-${range.value[1]}`}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X size={16} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X size={12} className="cursor-pointer" onClick={() => handleSearch('')} />
            </Badge>
          )}
          {activeFilters.specialty && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {activeFilters.specialty}
              <X size={12} className="cursor-pointer" onClick={() => onFilterSpecialty(null)} />
            </Badge>
          )}
          {activeFilters.availability && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {activeFilters.availability}
              <X size={12} className="cursor-pointer" onClick={() => onFilterAvailability(null)} />
            </Badge>
          )}
          {activeFilters.priceRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${activeFilters.priceRange[0]} - ${activeFilters.priceRange[1] === 999 ? '80+' : activeFilters.priceRange[1]}
              <X size={12} className="cursor-pointer" onClick={() => onFilterPriceRange(null)} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}