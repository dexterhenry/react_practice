import { useState } from "react"
import "./Filters.css"
import { useId } from "react"
import { useFilters } from "../hooks/useFilter"

export function Filters() {
  const { filters, setFilters: updateFilters } = useFilters()

  const minPriceFilterdId = useId()
  const catogryFilterdId = useId()

  const handleRangeChange = (event) => {
    const { value } = event.target
    updateFilters((prevState) => ({
      ...prevState,
      minPrice: Number(value),
    }))
  }

  const handleChangeCategory = (event) => {
    updateFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterdId}> Price </label>
        <input
          type='range'
          id={minPriceFilterdId}
          min='0'
          max='1000'
          onChange={handleRangeChange}
          value={filters.minPrice}
        />
        <span> ${filters.minPrice} </span>
      </div>

      <div>
        <label htmlFor={catogryFilterdId}> Category </label>
        <select id={catogryFilterdId} onChange={handleChangeCategory}>
          <option value='all'> All </option>
          <option value='laptops'> Laptops </option>
          <option value='smartphones'> Smartphones </option>
        </select>
      </div>
    </section>
  )
}
