### apollo-client


```js
  const [deleteClient] = useMutation(DELETE_CLIENT, { 
      variables: { id: client.id },
      // 요청 후 바뀐 정보를 요청하는 작업 
      // refetchQueries: [{ query: GET_CLIENTS }]
      
      // 캐시를 직접 업데이트하는 방법
      update(cache, { data: { deleteClient }}) {
        // 두번째 파라미터로 {data: {…}} 객체가 들어옴
        // 데이타 안의 deleteClient 객체 구조분해
        // deleteClient:
          // email: "Lin@chun.io"
          // id: "62a17e87124b55217f35a1eb"
          // name: "Lim-Chun"
          // phone: "010-xxxx-xxxx"
          // __typename: "Client"
        
        // 여기서 캐시에 있던 정보를 불러온 뒤 
        // 캐시 수정
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