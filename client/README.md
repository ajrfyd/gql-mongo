### apollo-client


```js
  const [deleteClient] = useMutation(DELETE_CLIENT, { 
      variables: { id: client.id },
      // 요청 후 바뀐 정보를 요청하는 작업 
      // refetchQueries: [{ query: GET_CLIENTS }]
      
      // 캐시 업데이트
      update(cache, { data: { deleteClient }}) {
        const { clients } = cache.readQuery({
          query: GET_CLIENTS
        });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: clients.filter(client => client.id !== deleteClient.id) },
        })
      }
    });
```