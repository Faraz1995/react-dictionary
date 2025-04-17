import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Row from '.'

const DragableRow = ({ entry, index, dictionary, setDictionary, selectedLang }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // Dragging downwards , only move when the cursor is below 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards , only move when the cursor is above 50%
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  const translation = entry[selectedLang]

  const moveItem = (from, to) => {
    const updated = [...dictionary]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setDictionary(updated)
  }

  return (
    <Row
      dragable={true}
      ref={ref}
      entry={entry}
      translation={translation}
      isDragging={isDragging}
    />
  )
}

export default DragableRow
