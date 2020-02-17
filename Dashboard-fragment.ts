...
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserThoughtsRequest(user.id)
      const thoughts: Thought[] = []
      const spiritCards: Thought[] = []

      data.forEach((thought: Thought) => {
        if (thought.isSpiritCard) {
          spiritCards.push(thought)
        } else {
          thoughts.push(thought)
        }
      })
      
      dispatch({ type: 'setUserThoughts', thoughts })
      dispatch({ type: 'setUserSpiritCards', spiritCards })

      const entries = await getJournalEntriesRequest(user.id)

      dispatch({ type: 'setJournalEntries', entries })
    }

    const getSharedData = async () => {
      const data = await getSharedInfo(user.id)
      dispatch({ type: 'setShared', shared: data })
    }
    
    if (user.id) {
      getUserData()
      getSharedData()
    }
  }, [user])
...
