using System.Collections.Generic;
using System.Linq;

namespace CoraCorpMCM.App.Shared.Services.Models
{
  public class ServiceResult<T> : ServiceResult
  {
    public new static ServiceResult<T> Success(T result)
    {
      return new ServiceResult<T> { Succeeded = true, Result = result };
    }

    public T Result { get; protected set; }
  }

  /// <summary>
  /// Represents the result of an operation.
  /// </summary>
  public class ServiceResult
  {
    private static readonly ServiceResult _success = new ServiceResult { Succeeded = true };
    private List<ServiceError> _errors = new List<ServiceError>();

    /// <summary>
    /// Flag indicating whether if the operation succeeded or not.
    /// </summary>
    /// <value>True if the operation succeeded, otherwise false.</value>
    public bool Succeeded { get; protected set; }

    /// <summary>
    /// An <see cref="IEnumerable{T}"/> of <see cref="ServiceError"/>s containing an errors
    /// that occurred during the operation.
    /// </summary>
    /// <value>An <see cref="IEnumerable{T}"/> of <see cref="ServiceError"/>s.</value>
    public IEnumerable<ServiceError> Errors => _errors;

    /// <summary>
    /// Returns an <see cref="ServiceResult"/> indicating a successful operation.
    /// </summary>
    /// <returns>An <see cref="ServiceResult"/> indicating a successful operation.</returns>
    public static ServiceResult Success => _success;

    /// <summary>
    /// Creates an <see cref="ServiceResult"/> indicating a failed operation, with a list of <paramref name="errors"/> if applicable.
    /// </summary>
    /// <param name="errors">An optional array of <see cref="ServiceError"/>s which caused the operation to fail.</param>
    /// <returns>An <see cref="ServiceResult"/> indicating a failed identity operation, with a list of <paramref name="errors"/> if applicable.</returns>
    public static ServiceResult Failed(params ServiceError[] errors)
    {
      var result = new ServiceResult { Succeeded = false };
      if (errors != null)
      {
        result._errors.AddRange(errors);
      }
      return result;
    }

    /// <summary>
    /// Converts the value of the current <see cref="ServiceResult"/> object to its equivalent string representation.
    /// </summary>
    /// <returns>A string representation of the current <see cref="ServiceResult"/> object.</returns>
    /// <remarks>
    /// If the operation was successful the ToString() will return "Succeeded" otherwise it returned 
    /// "Failed : " followed by a comma delimited list of error codes from its <see cref="Errors"/> collection, if any.
    /// </remarks>
    public override string ToString()
    {
      return Succeeded ?
        "Succeeded" :
        string.Format("{0} : {1}", "Failed", string.Join(",", Errors.Select(x => x.Code).ToList()));
    }
  }
}
