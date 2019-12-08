# 6770 ELEN Cloud Project
## [React](https://reactjs.org/) &middot; ![](https://img.shields.io/badge/npm-v13.3.0-blue)

## Overview
- This project is a React web application that provides real-time collaborative editors based on Conflict-free Replicated Data Types (CRDTs) implementation Yjs and Quill editor.
- You can find demo [here](http://3.136.85.49:3000/).
- More description about the project concepts and algorithms can be found in [report.pdf](https://github.com/camelboat/6770_ELEN_Cloud_Project/blob/master/report.pdf).

## Set up
```bash
$ git clone https://github.com/camelboat/6770_ELEN_Cloud_Project
$ cd 6770_ELEN_Cloud_Project
$ yarn
$ yarn build
$ yarn serve
```

## To-do List
- User authentication
- Editor room selection

## References
- [Yjs Github](https://github.com/yjs/yjs#Yjs-CRDT-Algorithm), [Yjs Demo Website](http://y-js.org/), [Yjs CRDTs Algorithm](https://www.researchgate.net/publication/310212186_Near_Real-Time_Peer-to-Peer_Shared_Editing_on_Extensible_Data_Types)
- [Quill Editor](https://quilljs.com/)
- [Conclave Case Study](https://conclave-team.github.io/conclave-site/#conflict-free-replicated-data-type-crdt)
- [Operational Transformation (OT)](https://en.wikipedia.org/wiki/Operational_transformation)
- [Conflict-free Replicated Data Type (CRDT)](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)