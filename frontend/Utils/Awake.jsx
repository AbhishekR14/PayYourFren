export default async function Awake() {
  try {
    const response = await axios.get(
      "https://payyourfren.onrender.com/api/v1/wakeup"
    );
    return res.status(200).send({
      message: response.data.message,
    });
  } catch (e) {
    return res.status(411).send({
      message: response.data.message,
    });
  }
}
