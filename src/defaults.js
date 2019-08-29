const defaults = {

  neo4j: {
    initialQuery: `MATCH (n) WHERE exists(n.pagerank)
                        WITH (n), RAND() AS random
                        ORDER BY random LIMIT 3000
                        OPTIONAL MATCH (n)-[r]-(m)
                        //WITH n,r,m WHERE exists(n.pagerank) AND exists(m.pagerank) AND exists(m.community)
                        RETURN n, r, m;`,
    neo4jUri: 'bolt://localhost:7687',
    neo4jUser: 'neo4j',
    neo4jPassword: 'neo4j',
    encrypted: 'ENCRYPTION_OFF',
    trust: 'TRUST_ALL_CERTIFICATES'
  },

  visjs: {
    groups: {
      useDefaultGroups: true,
      myGroupId: {
        /*node options*/
      }
    }
  }
}

export {defaults}
