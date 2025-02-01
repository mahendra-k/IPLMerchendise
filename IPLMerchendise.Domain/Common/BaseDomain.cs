namespace IPLMerchendise.Domain.Common
{
    /// <summary>
    /// Base Domain Class.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseDomain<T> 
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public T Id { get; set; }
    }
}
