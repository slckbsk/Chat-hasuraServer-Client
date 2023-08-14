import React from "react";
import Container from "react-bootstrap/Container";


function Loading() {

   return (
     <div>
       <Container>
         <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             textAlign: "center",
             fontSize: "20px",
             background: "white",
             height: 200,
             maxWidth: "100%",
             borderRadius: "1em",
             border: "1px solid Black",
           }}
         >
           LOADING ...
         </div>
       </Container>
     </div>
   );
}

export default Loading;



