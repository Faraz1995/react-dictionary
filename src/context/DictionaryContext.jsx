import React, { useState, useContext, useEffect } from 'react'

const DictionaryContext = React.createContext()
const SetDictionaryContext = React.createContext()

const initialData = [
  { key: 'hi', english: 'hi', persian: 'سلام', spanish: 'hola', french: 'salut' },
  {
    key: 'goodbye',
    english: 'goodbye',
    persian: 'خداحافظ',
    spanish: 'adiós',
    french: 'au revoir'
  },
  { key: 'book', english: 'book', persian: 'کتاب', spanish: '', french: 'livre' }
]

const LOCAL_STORAGE_KEY = 'dictionary'

function DictionaryProvider(props) {
  const [dictionary, setDictionary] = useState([])
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved && JSON.parse(saved).length > 0) {
      setDictionary(JSON.parse(saved))
    } else {
      setDictionary(initialData)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData))
    }
    setMounted(true)
  }, [])

  // Save to localStorage whenever dictionary changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dictionary))
    }
  }, [dictionary])

  return (
    <DictionaryContext.Provider value={dictionary}>
      <SetDictionaryContext.Provider value={setDictionary}>
        {props.children}
      </SetDictionaryContext.Provider>
    </DictionaryContext.Provider>
  )
}

const useDictionaryContext = () => {
  const dictionary = useContext(DictionaryContext)
  if (dictionary === undefined) {
    throw new Error('render <DictionaryProvider /> at top of the tree')
  }
  return dictionary
}

const useSetDictionaryContext = () => {
  const setDictionary = useContext(SetDictionaryContext)
  if (setDictionary === undefined) {
    throw new Error('render <DictionaryProvider /> at top of the tree')
  }
  return setDictionary
}

export { useDictionaryContext, useSetDictionaryContext }
export default DictionaryProvider
