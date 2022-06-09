export default function messageError(message, error, res){
    console.log(`${message}:`, error);
    res.status(500).send(
      { error: `Internal server. ${message}` }
    );
}